export const PHASES_TEMPLATES = [
  /* PHASE 1: Restructure + Light Personality Injection */
  `
-Paraphrase the following text to make it sound like something a real person would post online. 
Keep it casual, honest, and slightly imperfect. Introduce small human touches — such as personal phrasing, rhetorical questions, or minor tangents — to reflect a natural writing style.
Avoid emojis.
-Read the text and revise sentence rhythms to sound more spontaneous — like spoken language. 
Split or merge sentences for natural flow. Add conversational transitions or small hesitations if appropriate. 
Avoid making the structure too uniform or too polished. 
-Do a final read of the text. Make small tweaks to enhance emotional tone or authenticity (e.g., replace safe phrases with more personal ones).
Do NOT over-polish. Keep slight inconsistencies that make it feel human.
Avoid robotic transitions, remove clichés if found, and keep it relatable.
-Do not add any additional or unneccessary text. 

Return:
{
  "text": "<refined version>",
}
`,
`
Carefully review the paraphrased text below as if you were helping a friend polish something they just wrote online. You're not rewriting it — you're just giving it a final, sensitive polish.
Focus on tone, micro-rhythms, and authenticity. Fix small inconsistencies only if they disrupt clarity or tone — otherwise, leave them in.
Do not sanitize or over-correct.
Keep it raw, human, and just a little messy. Slight redundancies, informal transitions, or unexpected phrasing are good if they sound like something someone might naturally say.
Make only light adjustments where it truly helps flow, tone, or believability. Example tweaks include:
Softening overly formal or stiff phrases.
Swapping generic words with more emotionally specific ones.
Adjusting rhythm by breaking up or lightly compressing thoughts.
Dropping words that feel like filler if they add nothing emotionally or rhythmically.

Avoid:
Adding new ideas or flourishes.
Flattening voice or tone.
Introducing “AI-sounding” or overly balanced sentence structures.

Return:
{
  "text": "<refined version>",
  "changes": ["Mention changes without explicitly mentioning words", ...up to 3 only],
  "humanized_score": <accurate_humanized_score_out_of_100>
}
`,
];
  