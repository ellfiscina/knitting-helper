import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { weight } = req.query;
  const baseUrl = "https://api.ravelry.com/yarns";
  const queryUrl = `${baseUrl}/search.json?weight=${weight}&gauge=10|12`;
  const auth = {
    username: `${process.env.NEXT_PUBLIC_RAVELRY_USERNAME}`,
    password: `${process.env.NEXT_PUBLIC_RAVELRY_PASSWORD}`
  };

  await axios 
    .get(queryUrl, {auth})
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch(({ err }) => {
      res.status(400).json({ err });
    });
}
