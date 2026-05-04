import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()
    
    // Construct the payload for Gemini
    const geminiPayload = {
      contents: messages.map((m: any) => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }]
      })),
      systemInstruction: {
        parts: [{ text: "You are RemoteHunt AI, a career assistant for remote jobs. Use a professional, helpful, and encouraging tone. Help users find remote roles, improve their profiles, and navigate salary negotiations. Keep responses concise and formatted with markdown." }]
      }
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      }
    )

    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request."

    return new Response(
      JSON.stringify({ text: aiText }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
