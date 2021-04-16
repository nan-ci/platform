const center = text => {
  const lines = text.split('\n')
  const longest = lines.reduce((max, line) => Math.max(max, line.length), 0)
  const pad = ' '.repeat(38 - Math.floor(longest / 2))
  return lines.map(line => `#${pad}${line}`.padEnd(79, ' ')+'#').join('\n')
}

export const logo = center(`
                   .
                  d8b
                d88888b
              d888Y Y888b
            d888Y  .  Y888b
          d888Y   d8b   Y888b
        d888Y   d88888b   Y888b
         ""   d888Y Y888b   ""
            d888Y  .  Y888b
             ""   d8b   ""
                d88888b
                  Y8b
                   '
8888b   88888             8888b   88888
 8888b   888               8888b   888
 88888b  888               88888b  888
 888Y88b 888    88888b.    888Y88b 888
 888 Y88b888    "   "88b   888 Y88b888
 888  Y88888   .d8888888   888  Y88888
 888   Y8888   888   888   888   Y8888
88888   Y888   "Y88888"88 88888   Y888
`)
