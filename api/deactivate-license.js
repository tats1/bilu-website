export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { key, instanceId } = req.body

  if (!key || !instanceId) {
    return res.status(400).json({ success: false, message: 'Missing license key or instance id' })
  }

  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/deactivate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
      },
      body: JSON.stringify({
        license_key: key,
        instance_id: instanceId
      })
    })

    const data = await response.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error deactivating license' })
  }
}