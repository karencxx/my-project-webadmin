const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()

const config = {
  host: 'your-server-ip',
  username: 'root',
  privateKey: '/path/to/key'
}

async function deploy() {
  try {
    await ssh.connect(config)
    
    // 备份当前版本
    await ssh.execCommand('cp -r /var/www/html /var/www/backup/$(date +%Y%m%d_%H%M%S)')
    
    // 上传新版本
    await ssh.putDirectory('dist', '/var/www/html', {
      recursive: true,
      concurrency: 10
    })
    
    console.log('部署成功')
  } catch (err) {
    console.error('部署失败:', err)
  } finally {
    ssh.dispose()
  }
}

deploy() 