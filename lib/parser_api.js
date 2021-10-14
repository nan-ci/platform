export const ParserApi = async ({ lang, version, args, content }) => {
  return await (
    await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        language: lang,
        version,
        files: [
          {
            name: 'test.js',
            content,
          },
        ],
        stdin: '',
        args,
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    })
  ).json()
}
