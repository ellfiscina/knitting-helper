import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const url = 'https://api.ravelry.com/yarn_attributes/groups.json'

  await axios 
    .get(url, {headers: {
      Authorization: `${process.env.NEXT_PUBLIC_RAVELRY_USERNAME}:${process.env.NEXT_PUBLIC_RAVELRY_PASSWORD}`
    }})
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}