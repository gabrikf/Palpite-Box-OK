import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupon = () => {
    const code = parseInt(moment().format('YYMMDDHHmmssSSS ')).toString(16).toUpperCase()
    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4)
}

export default async (req, res) => {
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo()
        // Nome	Email	WhatsApp	Cupom	Promo
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A2:B2')
    
        const mostrarpromocaoCell = sheetConfig.getCell(1,0)
        const textoCell = sheetConfig.getCell(1,1)

        let Cupom = ''
        let Promo = ''
        if(mostrarpromocaoCell.value === 'VERDADEIRO') {
            Cupom = genCupon()
            Promo = textoCell.value
        }
        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            WhatsApp: data.WhatsApp,
            Sugestão: data.Sugestão,
            Nota: parseInt(data.Nota),
            Data: moment().format('DD/MM/YYYY h:mm:ss '),
            Cupom,
            Promo
        })
        res.end(JSON.stringify({
            showCoupon: Cupom !== '',
            Cupom,
            Promo
        }))
    }   catch (err) {
        res.end('error')
    }
    
}