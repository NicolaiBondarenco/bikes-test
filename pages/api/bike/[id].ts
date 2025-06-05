import { NextApiRequest, NextApiResponse } from 'next';
import { sheets, spreadsheetId } from '@/lib/sheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	if (typeof id !== 'string') return res.status(400).send('Invalid id');

	const rowRange = 'Bikes Database!A2:D';
	const logsRange = 'Logs!A2:E';

	if (req.method === 'GET') {
		const data = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range: rowRange,
		});

		const rows = data.data.values || [];
		const row = rows.find(r => r[0] === id);

		if (!row) return res.status(404).json({ error: 'Bike not found' });

		return res.json({
			id: row[0],
			status: row[1],
			brand: row[2],
			user: row[3] ?? null,
		});
	}

	if (req.method === 'POST') {
		const { status, user } = req.body;

		const data = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range: rowRange,
		});

		const rows = data.data.values || [];
		const rowIndex = rows.findIndex(r => r[0] === id);
		if (rowIndex === -1) return res.status(404).json({ error: 'Bike not found' });

		const brand = rows[rowIndex][2];
		// take old user if the status is Inactive
		const oldUser = rows[rowIndex][3] || '';
		const actionType = status === 'Active' ? 'Added' : 'Returned';

		// make date as "05 Jun 25"
		const now = new Date();
		const formattedDate = now.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: '2-digit',
		}).replace(/ /g, ' ');

		// add in log
		await sheets.spreadsheets.values.append({
			spreadsheetId,
			range: logsRange,
			valueInputOption: 'USER_ENTERED',
			requestBody: {
				values: [[
					formattedDate,
					actionType,
					id,
					brand,
					status === 'Active' ? user : oldUser
				]],
			},
		});

		// add string to a "Bikes Database"
		await sheets.spreadsheets.values.update({
			spreadsheetId,
			range: `Bikes Database!A${rowIndex + 2}:D${rowIndex + 2}`,
			valueInputOption: 'RAW',
			requestBody: {
				values: [[
					id,
					status,
					brand,
					status === 'Active' ? user : ''
				]],
			},
		});

		return res.status(200).json({ message: 'Updated' });
	}

	return res.status(405).send('Method not allowed');
}
