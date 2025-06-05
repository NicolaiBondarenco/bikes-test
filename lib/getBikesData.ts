import { sheets, spreadsheetId } from './sheets';

export async function getBikesData() {
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId,
		range: 'Bikes Database!A2:D',
	});

	const rows = res.data.values;
	if (!rows || rows.length === 0) return [];

	return rows.map((row) => ({
		id: row[0],
		status: row[1],
		brand: row[2],
		user: row[3] ?? null,
	}));
}