const puppeteer = require('puppeteer');
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
	name: 'sample-express-app',
	port: 3000,
	host: '0.0.0.0',
};

const puppeteerConfig = {
	browser: {
		args: ['--no-sandbox', '--disable-dev-shm-usage'],
		headless: true,
		executablePath: '/usr/bin/chromium-browser'
	},
	page: {
		path: 'index.pdf', 
		format: 'A4',
		printBackground: true
	},
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/generate', async (req, res) => {
	const browser = await puppeteer.launch(puppeteerConfig.browser),
		page = await browser.newPage()

	await page.goto(`data:text/html,${req.body.htmlContent}`, { waitUntil: 'networkidle0' })
	
	const pdf = await page.pdf(puppeteerConfig.page);

	await browser.close();

	res.set({
		'Content-Type': 'application/pdf',
		'Content-Length': pdf.length
	})

	res.send(pdf)
})

app.listen(config.port, config.host, (e) => {
	if (e) {
		throw new Error('Internal Server Error');
	}
});