const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 获取环境参数
const env = process.env.NODE_ENV || 'production'
const deployPath = env === 'beta' ? '.deploy/beta' : '.deploy/pro'

// 确保部署目录存在
function ensureDeployDir() {
  const baseDir = '.deploy'
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }
  if (!fs.existsSync(deployPath)) {
    fs.mkdirSync(deployPath, { recursive: true })
  }
}

// 复制dist目录到部署目录
function copyDistToDeploy() {
  // 清空部署目录
  if (fs.existsSync(deployPath)) {
    fs.rmSync(deployPath, { recursive: true, force: true })
  }
  fs.mkdirSync(deployPath, { recursive: true })

  // 复制dist目录内容到部署目录
  if (fs.existsSync('dist')) {
    const files = fs.readdirSync('dist')
    files.forEach(file => {
      const srcPath = path.join('dist', file)
      const destPath = path.join(deployPath, file)
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true })
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    })
  } else {
    throw new Error('dist 目录不存在，请先运行构建命令')
  }
}

// 部署到 GitHub Pages
async function deployToGithub() {
  try {
    const repoUrl = 'git@github.com:karencxx/admin-dist.git'
    const targetBranch = 'gh-pages'
    
    // 确保部署目录存在
    ensureDeployDir()
    
    // 复制dist到部署目录
    copyDistToDeploy()

    // 如果是测试环境，创建 beta 子目录
    if (env === 'beta') {
      // 克隆现有的 gh-pages 分支
      if (!fs.existsSync('.deploy/temp')) {
        fs.mkdirSync('.deploy/temp')
        process.chdir('.deploy/temp')
        try {
          execSync(`git clone -b ${targetBranch} ${repoUrl} .`)
        } catch (error) {
          console.log('首次部署，创建新的分支')
        }
        process.chdir('../..')
      }

      // 确保 beta 目录存在
      const betaPath = path.join('.deploy/temp', 'beta')
      if (fs.existsSync(betaPath)) {
        fs.rmSync(betaPath, { recursive: true })
      }
      
      // 复制新的构建文件到 beta 目录
      fs.mkdirSync(betaPath, { recursive: true })
      fs.cpSync(deployPath, betaPath, { recursive: true })
      
      // 切换到临时目录进行提交
      process.chdir('.deploy/temp')
    } else {
      // 生产环境直接使用根目录
      process.chdir(deployPath)
    }
    
    // 初始化或更新 git 仓库
    if (!fs.existsSync('.git')) {
      execSync('git init')
      execSync(`git remote add origin ${repoUrl}`)
    }
    
    // 添加所有文件
    execSync('git add -A')
    
    // 提交更改
    try {
      execSync('git commit -m "deploy to Github Pages"')
    } catch (error) {
      console.log('没有需要提交的更改')
      return
    }
    
    // 推送到 GitHub Pages
    execSync(`git push -f ${repoUrl} HEAD:${targetBranch}`)
    
    console.log(`部署成功到 GitHub Pages ${env === 'beta' ? 'beta' : ''} 环境`)
  } catch (err) {
    console.error('部署失败:', err)
    process.exit(1)
  }
}

deployToGithub() 