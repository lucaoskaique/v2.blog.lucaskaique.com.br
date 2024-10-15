/* eslint-disable no-unused-vars */
import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "edge"
}

export default function handler(req: Request, _res: Response) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") || "Hello, World!"
  const emoji = searchParams.get("emoji") || "🤠"

  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%"
          }}>
          {title} {emoji}
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
