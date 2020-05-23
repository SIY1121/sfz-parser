# sfz-parser

Parse SFZ file to json

```typescript
import parseSFZ from 'sfz-parser'
import fs from 'fs'

parseSFZ(fs.readSync('piano.sfz', 'utf-8'))
```