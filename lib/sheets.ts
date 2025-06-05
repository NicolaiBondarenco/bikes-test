import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const GOOGLE_SHEET_ID = process.env.SPREADSHEET_ID!;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

const auth = new JWT({
	email: GOOGLE_CLIENT_EMAIL,
	key: GOOGLE_PRIVATE_KEY,
	scopes: SCOPES,
});

export const sheets = google.sheets({ version: 'v4', auth });
export const spreadsheetId = GOOGLE_SHEET_ID;
