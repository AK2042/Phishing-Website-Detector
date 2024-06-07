// pages/api/checkPhishing.js
import { exec } from 'child_process';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    exec(`python3 ../../../phishing_detection_server/python_file/fasterapi.py ${url}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: 'Failed to execute Python script' });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: stderr.toString() });
      }
    
      res.status(200).json({ result: stdout.trim() });
    })}}
