module.exports = { 
    root: true, 
    parserOptions: { 
        parser: 'babel-eslint' 
    }, 
    env: { 
        node: true,
        browser: true,
        es6: true
    }, 
    extends: [
        'plugin:vue/essential',
    ],
    rules: { 
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off' 
    }
}