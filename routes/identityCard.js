const { extractData } = require('../modules/identityCard/index')
const { initForm } = require('../utils/formData')

const extractIdentityCard = async (req, res, next) => {
  let data = {
    error: false,
    message: null,
    text: null
  }
  res.writeHead(200)
  var form = initForm('images/storage/identityCard')

  form.parse(req, async (err, fields, file) => {


    const f = file['']
    console.log(f);

    const imgPath = f.path
    data.message = imgPath
    await extractData(imgPath)
      .then(rs => {
        data.text = rs
      })
      .catch(err => {
        data.error = true
        data.message = err
      })

    res.end(JSON.stringify(data))
  })
}

module.exports = {
  extractIdentityCard
}
