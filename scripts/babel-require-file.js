module.exports = function stylesInjector({ template }) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          if (
            state.opts &&
            state.opts.targetPath &&
            this.file.opts.filename == state.opts.targetPath
          ) {
            if (!(state.opts.stylesPath && state.targetPath)) {
              console.warn('Please specify a `stylesPath` to import')
            }
            const importStatement = template(
              `require('${state.opts.stylesPath}');`,
              {
                sourceType: 'module'
              }
            )
            path.pushContainer('body', importStatement())
          }
        }
      }
    }
  }
}
