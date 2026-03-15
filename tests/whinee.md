## Environment

```sh
→ fastfetch -l none
lyra@cezanne-shiroi-neko
------------------------
OS: Fedora Linux 42 (Adams) x86_64
Kernel: Linux 6.17.10-200.fc42.x86_64
Shell: bash 5.2.37
CPU: AMD Ryzen 5 5600G (12) @ 4.46 GHz
GPU: AMD Radeon Vega Series / Radeon Vega Mobile Series [Integrated]
Memory: 10.37 GiB / 14.91 GiB (70%)
Swap: 4.68 GiB / 48.00 GiB (10%)
Disk (/): 87.57 GiB / 140.00 GiB (63%) - btrfs
Disk (/home): 485.63 GiB / 789.51 GiB (62%) - btrfs
Locale: en_US.UTF-8
```

## Tasks

The following tasks are done in order to be able to test the software effectively.

```sh
sudo dnf install -y golang
```

```sh
go build -o intu .
```

The built binary was located in `'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu'` in the tester's machine.

## Tests

### TC-001: PASS

Command:

```sh
./intu init demo --dir /tmp/intu
```

Output:

```txt
Installing dependencies...

added 3 packages, and audited 4 packages in 2s

found 0 vulnerabilities

Project created: demo (2 channels)
Next steps:
  cd /tmp/intu/demo
  npm run dev
```

Command:

```sh
ls /tmp/intu
```

Output:

```
demo
```

Command:

```sh
ls /tmp/intu/demo
```

Output:

```txt
docker-compose.yml  Dockerfile  intu.dev.yaml  intu.prod.yaml  intu.yaml  node_modules  package.json  package-lock.json  README.md  src  tsconfig.json
```

### TC-002: FAIL

The second run should fail. It did not.

Command:

```sh
./intu init demo --dir /tmp/intu
```

Output:

```txt
Installing dependencies...

up to date, audited 4 packages in 491ms

found 0 vulnerabilities

Project created: demo (2 channels)
Next steps:
  cd /tmp/intu/demo
  npm run dev
```

### TC-003: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' c my-channel --dir .
```

Output:

```txt
Channel created: my-channel
```

Command:

```sh
ls /tmp/intu/demo/src/channels/my-channel/
```

Output:

```txt
channel.yaml
```

Command:

```sh
cat /tmp/intu/demo/src/channels/my-channel/channel.yaml
```

Output:

```txt
id: my-channel
enabled: true
description: ""

listener:
  type: http
  http:
    port: 8081

# validator:
#   entrypoint: validator.ts

# transformer:
#   entrypoint: transformer.ts

destinations:
  - file-output
```

### TC-004: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/src/channels/my-channel/channel.yaml > /dev/null <<'EOF'
id: my-channel
enabled: true
description: ""

tags:
  - hl7
  - adt
group: inbound

listener:
  type: http
  http:
    port: 8081

# validator:
#   entrypoint: validator.ts

# transformer:
#   entrypoint: transformer.ts

destinations:
  - file-output
EOF
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel list --dir .
```

Output:

```txt
fhir-to-adt                    enabled     path=fhir-to-adt
http-to-file                   enabled     path=http-to-file
my-channel                     enabled     path=my-channel  tags=[hl7 adt]  group=inbound
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel list --dir . --tag hl7
```

Output:

```txt
my-channel                     enabled     path=my-channel  tags=[hl7 adt]  group=inbound
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel list --dir . --tag adt
```

Output:

```txt
my-channel                     enabled     path=my-channel  tags=[hl7 adt]  group=inbound
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel list --dir . --tag hl8
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel list --dir . --group inbound
```

Output:

```txt
my-channel                     enabled     path=my-channel  tags=[hl7 adt]  group=inbound
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel list --dir . --group outbound
```

Output:

```txt
```

### TC-005: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel describe http-to-file --dir .
```

Output:

```txt
description: Receives HTTP messages, validates, transforms, and writes to file
destinations:
    - file-output
enabled: true
id: http-to-file
listener:
    http:
        path: /ingest
        port: 8081
    type: http
transformer:
    entrypoint: transformer.ts
validator:
    entrypoint: validator.ts
```

### TC-006: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel clone http-to-file http-clone --dir .
```

Output:

```txt
Cloned channel "http-to-file" -> "http-clone" (3 files)
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel describe http-clone --dir .
```

Output:

```txt
description: Receives HTTP messages, validates, transforms, and writes to file
destinations:
    - file-output
enabled: true
id: http-clone
listener:
    http:
        path: /ingest
        port: 8081
    type: http
transformer:
    entrypoint: transformer.ts
validator:
    entrypoint: validator.ts
```

### TC-007: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel export http-to-file --dir . -o /tmp/channel.tar.gz
```

Output:

```txt
Exported channel "http-to-file" to /tmp/channel.tar.gz (3 files)
```

Command:

```sh
tar -tf /tmp/channel.tar.gz
```

Output:

```txt
http-to-file/channel.yaml
http-to-file/transformer.ts
http-to-file/validator.ts
```

### TC-008: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel export http-clone --dir . -o /tmp/channel.tar.gz
```

Output:

```txt
Exported channel "http-clone" to /tmp/channel.tar.gz (3 files)
```

Command:

```sh
rm -rf /tmp/intu/demo/src/channels/http-clone/
```

Output:

```txt
```

Command:

```sh
ls /tmp/intu/demo/src/channels/
```

Output:

```txt
fhir-to-adt  http-to-file  my-channel
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel import /tmp/channel.tar.gz --dir .
```

Output:

```txt
Imported channel "http-clone" from /tmp/channel.tar.gz (3 files)
```

Command:

```sh
ls /tmp/intu/demo/src/channels/
```

Output:

```txt
fhir-to-adt  http-clone  http-to-file  my-channel
```

Command:

```sh
ls /tmp/intu/demo/src/channels/http-clone
```

Output:

```txt
channel.yaml  transformer.ts  validator.ts
```

### TC-009: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' validate --dir .
```

Output:

```txt
  error: duplicate listener: channels "http-clone" and "http-to-file" both use port 8081 path "/ingest"
validation failed: 1 error(s)
```

Command:

```sh
tee /tmp/intu/demo/src/channels/http-clone/channel.yaml > /dev/null <<'EOF'
id: http-clone
enabled: true
description: "Receives HTTP messages, validates, transforms, and writes to file"

listener:
  type: http
  http:
    port: 8082
    path: /ingest

validator:
  entrypoint: validator.ts

transformer:
  entrypoint: transformer.ts

destinations:
  - file-output
EOF
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' validate --dir .
```

Output:

```txt
Validation passed: 4 channel(s), profile=dev
```

### TC-010: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/src/channels/http-clone/channel.yaml > /dev/null <<'EOF'
id: http-clone
enabled: true
description: "Receives HTTP messages, validates, transforms, and writes to file"

listener:
  type: http
  http:
    port: 8081
    path: /ingest

validator:
  entrypoint: validator.ts

transformer:
  entrypoint: transformer.ts

destinations:
  - file-output
EOF
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' validate --dir .
```

Output:

```txt
  error: duplicate listener: channels "http-clone" and "http-to-file" both use port 8081 path "/ingest"
validation failed: 1 error(s)
```

### TC-011: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' channel clone http-to-file http-clone --dir .
```

Output:

```txt
Cloned channel "http-to-file" -> "http-clone" (3 files)
```

Command:

```sh
tee /tmp/intu/demo/src/channels/http-clone/channel.yaml > /dev/null <<'EOF'
id: http-clone
enabled: true
profiles:
  - dev
description: "Receives HTTP messages, validates, transforms, and writes to file"

listener:
  type: http
  http:
    port: 8082
    path: /ingest

validator:
  entrypoint: validator.ts

transformer:
  entrypoint: transformer.ts

destinations:
  - file-output
EOF
```

Output:

```txt
```

Command:

```sh
ls /tmp/intu/demo/src/channels/
```

Output:

```txt
fhir-to-adt  http-clone  http-to-file
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' validate --profile prod
```

Output:

```txt
Validation passed: 2 channel(s), profile=prod
```

### TC-012: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' build --dir .
```

Output:

```txt
Validation passed: 3 channel(s), profile=dev

> intu-channel-runtime@0.1.0 build
> tsc -p tsconfig.json

Build complete.
```

Command:

```sh
ls -1 /tmp/intu/demo/
```

Output:

```txt
dist
docker-compose.yml
Dockerfile
intu.dev.yaml
intu.prod.yaml
intu.yaml
node_modules
package.json
package-lock.json
README.md
src
tsconfig.json
```

Command:

```sh
ls -1 /tmp/intu/demo/dist
```

Output:

```txt
src
```

Command:

```sh
ls -1 /tmp/intu/demo/dist/src
```

Output:

```txt
channels
```

Command:

```sh
ls -1 /tmp/intu/demo/dist/src/channels
```

Output:

```txt
fhir-to-adt
http-clone
http-to-file
```

Command:

```sh
ls -1 /tmp/intu/demo/dist/src/channels/http-clone
```

Output:

```txt
transformer.js
validator.js
```

Command:

```sh
tee /tmp/intu/demo/src/channels/http-clone/transformer.ts > /dev/null <<'EOF'
 function transform(msg: IntuMessage, ctx: IntuContext): IntuMessage {
  return {
    body: {
      ...(msg.body as object),
      processedAt: new Date().toISOString(),
      source: ctx.channelId,
    },
  };
}a
EOF
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' build --dir .
```

Output:

```txt
Validation passed: 3 channel(s), profile=dev

> intu-channel-runtime@0.1.0 build
> tsc -p tsconfig.json

src/channels/http-clone/transformer.ts:9:2 - error TS2304: Cannot find name 'a'.

9 }a
   ~


Found 1 error in src/channels/http-clone/transformer.ts:9

npm run build: exit status 2
```

Command:

```sh
tee /tmp/intu/demo/src/channels/http-clone/transformer.ts > /dev/null <<'EOF'
 function transform(msg: IntuMessage, ctx: IntuContext): IntuMessage {
  return {
    body: {
      ...(msg.body as object),
      processedAt: new Date().toISOString(),
      source: ctx.channelId,
    },
  };
}
EOF
```

Output:

```txt
```

### TC-013: 

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh

```

Output:

```txt

```

---

## Markdown Templates

These are templates for writing repetitive stuff

### Command And Output

Command:

```sh

```

Output:

```txt

```