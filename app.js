const express = require('express')
const app = express()
const fs = require('fs').promises
const path = require('path')

app.set('trust proxy', true)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    console.log("200")
    res.render("index")
})

app.get('/new', (req, res) => {
    res.render("users/new")
})

app.post('/users', async (req, res) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    const { firstName} = req.body
    const fnu = firstName.toUpperCase()
    const zapis = []

    try {
        const data = await fs.readFile('pulanovo.json', 'utf-8')
        const obj = JSON.parse(data)
        const timestamp = Date.now()
        const userLog = {
            Upis: firstName,
            IP: req.ip,
            Vrijeme: new Date(timestamp + 2 * 60 * 60 * 1000),
            User_Agent: req.header('user-agent')
        }

        await fs.appendFile('tracking.txt', `${JSON.stringify(userLog)},`, 'utf8')

        outer: for (const group of obj) {
            for (const entry of group) {
                if (entry.ime.includes(fnu)) {
                    zapis.push(
                        `Ime: ${entry.ime}`,
                        `OIB: ${entry.OIB}`,
                        `Zemljišnoknjižni ured: ${entry.Zemljišnoknjižni_ured}`,
                        `Broj ZK uloška/KPU poduloška: ${entry.Broj_ZK_uloška_KPU_poduloška}`,
                        "/--------/"
                    )
                    if (zapis.length >= 50) {
                        zapis.push('PREKO 10 REZULTATA.................................')
                        break outer
                    }
                }
            }
        }

        await delay(1000)
        res.render('results', { text_1: zapis })

        // Update limiter.json
        try {
            const limiterData = await fs.readFile('limiter.json', 'utf-8')
            const ipRecords = JSON.parse(limiterData)

            await fs.writeFile('limiter.json', JSON.stringify(ipRecords, null, 2), 'utf8')
        } catch (err) {
            console.error("Limiter update error:", err)
        }

    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }
})

app.listen(process.env.PORT || 5000)
