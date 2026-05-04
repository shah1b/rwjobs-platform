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
    const { messages, user } = await req.json()
    
    // Check if user has a resume
    const hasResume = !!user?.user_metadata?.resume_path;
    const resumeContext = hasResume 
      ? `The user has uploaded a resume. Priority: Analyze their profile and suggest roles that fit their uploaded background.`
      : `The user has not uploaded a resume yet. Suggest they do so in the Profile panel for better matching.`;

    // Construct the payload for Gemini
    const geminiPayload = {
      contents: [
        { role: 'user', parts: [{ text: `CONTEXT: ${resumeContext} User Email: ${user?.email || 'Guest'}` }] },
        ...messages.map((m: any) => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }]
        }))
      ],
      systemInstruction: {
        parts: [{ text: "You are RemoteHunt AI, a senior career strategist. You have access to the user's resume status. If they have a resume, act as if you've scanned it and provide high-confidence job matching. If they don't, be helpful but mention that uploading a resume will unlock personalized matching." }]
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
