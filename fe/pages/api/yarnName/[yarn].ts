import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { yarn } = req.query;
  const baseUrl = "https://api.ravelry.com/yarns";
  const queryUrl = `${baseUrl}/search.json?query=${yarn}`;
  const auth = {
    username: `${process.env.NEXT_PUBLIC_RAVELRY_USERNAME}`,
    password: `${process.env.NEXT_PUBLIC_RAVELRY_PASSWORD}`
  };
  let id = null;

  await axios 
    .get(queryUrl, {auth})
    .then(({ data }) => {
      id = data.yarns[0].id;
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });

  if (id) {
    await axios 
    .get(`${baseUrl}/${id}.json`, {auth})
    .then(({ data }) => {
      res.status(200).json(data.yarn);
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
  }
  
}
