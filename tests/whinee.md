## Table of Contents

```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
include: 
exclude: 
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```
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

## Initialization of Environment

The following commands are run in order to run the software:

Docker and the Go language was first installed in the machine:

```sh
sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
sudo dnf config-manager addrepo --from-repofile https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo dnf install -y golang
sudo groupadd --system docker
sudo systemctl enable --now docker
```

Then, the project was built:

```sh
go build -o intu .
```

The built binary was located in `'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu'` in the tester's machine.

Every time the machine is rebooted, the following command is ran:

```sh
./intu init demo --dir /tmp/intu
```

In the later tests, the project was installed thru the following:

```sh
sudo npm i -g intu-dev
```

Now, the program can be ran as:

```sh
intu
```

From now on, every time the machine is rebooted, the following command is ran:

```sh
intu init demo --dir /tmp/intu
```

Databases have also been set up in order to accomodate for the other test cases as well.

```sh
sudo docker run -d --name pg --env-file .env -p 5432:5432 postgres
sudo docker exec -it pg psql -U intu -c "CREATE DATABASE intu_message;"
```

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

### TC-002: PASS

Command:

```sh
intu init demo --dir /tmp/intu
```

Output:

```txt
project directory already exists: /tmp/intu/demo (use --force to overwrite)
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

### TC-013: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' serve --dir .
```

Output:

```txt
{"time":"2026-03-15T09:21:41.735406882+08:00","level":"INFO","msg":"building TypeScript channels"}

> intu-channel-runtime@0.1.0 build
> tsc -p tsconfig.json

{"time":"2026-03-15T09:21:43.035795404+08:00","level":"INFO","msg":"build complete"}
{"time":"2026-03-15T09:21:43.036475123+08:00","level":"INFO","msg":"config loaded","name":"intu","profile":"dev"}
{"time":"2026-03-15T09:21:43.036491813+08:00","level":"INFO","msg":"secrets provider initialized","provider":"env"}
{"time":"2026-03-15T09:21:43.036502713+08:00","level":"INFO","msg":"message store initialized","driver":"memory","mode":"full"}
{"time":"2026-03-15T09:21:43.036508853+08:00","level":"INFO","msg":"audit logger initialized","destination":"memory"}
{"time":"2026-03-15T09:21:43.036526333+08:00","level":"INFO","msg":"starting engine","name":"intu"}
{"time":"2026-03-15T09:21:43.037610551+08:00","level":"INFO","msg":"node worker pool started","pool_size":4}
{"time":"2026-03-15T09:21:43.038415859+08:00","level":"INFO","msg":"starting channel","id":"fhir-to-adt"}
{"time":"2026-03-15T09:21:43.038720109+08:00","level":"INFO","msg":"FHIR source started","addr":":8082","base_path":"/fhir/r4","version":"R4","tls":false}
{"time":"2026-03-15T09:21:43.038732069+08:00","level":"INFO","msg":"channel started","id":"fhir-to-adt"}
{"time":"2026-03-15T09:21:43.038741199+08:00","level":"INFO","msg":"starting channel","id":"http-clone"}
{"time":"2026-03-15T09:21:43.038798839+08:00","level":"ERROR","msg":"failed to start channel","id":"http-clone","error":"listen on :8082: listen tcp :8082: bind: address already in use"}
{"time":"2026-03-15T09:21:43.038815709+08:00","level":"INFO","msg":"starting channel","id":"http-to-file"}
{"time":"2026-03-15T09:21:43.038857049+08:00","level":"INFO","msg":"shared HTTP listener started","addr":":8081","tls":false}
{"time":"2026-03-15T09:21:43.038870068+08:00","level":"INFO","msg":"HTTP channel registered","port":8081,"path":"/ingest"}
{"time":"2026-03-15T09:21:43.038876998+08:00","level":"INFO","msg":"channel started","id":"http-to-file"}
{"time":"2026-03-15T09:21:43.250123234+08:00","level":"INFO","msg":"engine started","channels":2,"mode":"standalone"}
{"time":"2026-03-15T09:21:43.250358494+08:00","level":"INFO","msg":"channel hot-reload enabled","dir":"src/channels"}
{"time":"2026-03-15T09:21:43.250493224+08:00","level":"INFO","msg":"dashboard listening","addr":"[::]:3000"}
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
```

Command:

```sh
curl localhost:3000
```

Output:

```txt
<a href="/login">Found</a>.
```

URL:

```url
http://localhost:3000
```

Browser:

![](whinee/Pasted%20image%2020260315091804.png)

Logging in with the credentials `admin:admin` leads to the following page:

![](whinee/Pasted%20image%2020260315092618.png)
### TC-014: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/intu.yaml > /dev/null <<'EOF'
runtime:
  name: intu
  profile: dev
  log_level: info
  mode: standalone
  worker_pool: 4
  storage:
    driver: memory
    postgres_dsn: ${INTU_POSTGRES_DSN}

channels_dir: src/channels

message_storage:
  driver: postgres         # memory | postgres | s3
  mode: full               # none | status | full
  connection:
    host: ${PG_HOST:-localhost}
    port: 5432
    database: intu_messages
    username: ${PG_USER}
    password: ${PG_PASSWORD}

logging:
  level: info
  format: json
  transports:
    - type: console

destinations:
  file-output:
    type: file
    file:
      directory: ./output
      filename_pattern: "{{channelId}}_{{messageId}}_{{timestamp}}.json"

  hl7-file-output:
    type: file
    file:
      directory: ./output
      filename_pattern: "{{channelId}}_{{messageId}}_{{timestamp}}.hl7"

dashboard:
  enabled: true
  port: 3000
  auth:
    provider: basic
    username: admin
    password: admin

audit:
  enabled: true
  destination: memory
EOF
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/intu.yaml > /dev/null <<'EOF'
runtime:
  profile: dev
  log_level: debug
  mode: standalone

message_storage:
  driver: memory
  mode: full
  memory:
    max_records: 100000       # evicts oldest when exceeded
    max_bytes: 536870912      # 512 MB; evicts oldest when exceeded
EOF
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' serve --dir . --profile dev
```

Output:

```txt
{"time":"2026-03-16T16:00:13.266016082+08:00","level":"INFO","msg":"building TypeScript channels"}

> intu-channel-runtime@0.1.0 build
> tsc -p tsconfig.json

{"time":"2026-03-16T16:00:14.546149805+08:00","level":"INFO","msg":"build complete"}
{"time":"2026-03-16T16:00:14.546538015+08:00","level":"INFO","msg":"config loaded","name":"","profile":"dev"}
{"time":"2026-03-16T16:00:14.546557285+08:00","level":"INFO","msg":"secrets provider initialized","provider":"env"}
{"time":"2026-03-16T16:00:14.546567805+08:00","level":"INFO","msg":"message store initialized","driver":"memory","mode":"full"}
{"time":"2026-03-16T16:00:14.546585545+08:00","level":"INFO","msg":"starting engine","name":""}
{"time":"2026-03-16T16:00:14.552563077+08:00","level":"INFO","msg":"node worker pool started","pool_size":8}
{"time":"2026-03-16T16:00:14.553527756+08:00","level":"WARN","msg":"destination not found in root config","ref":"hl7-file-output","channel":"fhir-to-adt"}
{"time":"2026-03-16T16:00:14.553550596+08:00","level":"INFO","msg":"starting channel","id":"fhir-to-adt"}
{"time":"2026-03-16T16:00:14.554281675+08:00","level":"INFO","msg":"FHIR source started","addr":":8082","base_path":"/fhir/r4","version":"R4","tls":false}
{"time":"2026-03-16T16:00:14.554295145+08:00","level":"INFO","msg":"channel started","id":"fhir-to-adt"}
{"time":"2026-03-16T16:00:14.554303415+08:00","level":"WARN","msg":"destination not found in root config","ref":"file-output","channel":"http-to-file"}
{"time":"2026-03-16T16:00:14.554312395+08:00","level":"INFO","msg":"starting channel","id":"http-to-file"}
{"time":"2026-03-16T16:00:14.554348585+08:00","level":"INFO","msg":"shared HTTP listener started","addr":":8081","tls":false}
{"time":"2026-03-16T16:00:14.554356405+08:00","level":"INFO","msg":"HTTP channel registered","port":8081,"path":"/ingest"}
{"time":"2026-03-16T16:00:14.554362465+08:00","level":"INFO","msg":"channel started","id":"http-to-file"}
{"time":"2026-03-16T16:00:14.967918683+08:00","level":"INFO","msg":"engine started","channels":2,"mode":"standalone"}
{"time":"2026-03-16T16:00:14.968507452+08:00","level":"INFO","msg":"channel hot-reload enabled","dir":"."}
{"time":"2026-03-16T16:00:14.968657302+08:00","level":"INFO","msg":"dashboard listening","addr":"[::]:3000"}
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
```

Command:

```sh
curl localhost:3000
```

Output:

```txt
<a href="/login">Found</a>.
```

URL:

```url
http://localhost:3000
```

Browser:

![](whinee/Pasted%20image%2020260315091804.png)
### TC-015: FAIL

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' serve --dir . --profile dev
```

Output:

```txt
{"time":"2026-03-15T09:11:11.362282007+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
{"time":"2026-03-15T09:38:00.924897713+08:00","level":"INFO","msg":"channel config changed, reloading","channel":"http-to-file"}
{"time":"2026-03-15T09:38:00.924916673+08:00","level":"INFO","msg":"stopping channel","id":"http-to-file"}
{"time":"2026-03-15T09:38:00.924966973+08:00","level":"INFO","msg":"shared HTTP listener stopped","port":8081}
{"time":"2026-03-15T09:38:00.924974103+08:00","level":"INFO","msg":"channel stopped for hot-reload","channel":"http-to-file"}
{"time":"2026-03-15T09:38:01.025272342+08:00","level":"INFO","msg":"starting channel","id":"http-to-file"}
{"time":"2026-03-15T09:38:01.025344522+08:00","level":"INFO","msg":"shared HTTP listener started","addr":":8081","tls":false}
{"time":"2026-03-15T09:38:01.025352582+08:00","level":"INFO","msg":"HTTP channel registered","port":8081,"path":"/ingest"}
{"time":"2026-03-15T09:38:01.025358332+08:00","level":"INFO","msg":"channel hot-reloaded","channel":"http-to-file"}
{"time":"2026-03-15T09:46:26.434916519+08:00","level":"INFO","msg":"message received","channel":"http-to-file","messageId":"51d30c5b-730a-4930-8896-0b259fa1a742","correlationId":"51d30c5b-730a-4930-8896-0b259fa1a742"}
{"time":"2026-03-15T09:46:26.44389454+08:00","level":"INFO","msg":"script executed","channel":"http-to-file","function":"validate","file":"validator.ts","duration_ms":8.881}
{"time":"2026-03-15T09:46:26.44443762+08:00","level":"INFO","msg":"script executed","channel":"http-to-file","function":"transform","file":"transformer.ts","duration_ms":0.492}
{"time":"2026-03-15T09:46:26.449370485+08:00","level":"INFO","msg":"message processed","channel":"http-to-file","messageId":"51d30c5b-730a-4930-8896-0b259fa1a742","correlationId":"51d30c5b-730a-4930-8896-0b259fa1a742","durationMs":14,"destinations":1}
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' deploy http-to-file --dir .
```

Output:

```txt
```

Command:

```sh
ls -1 /tmp/intu/demo
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
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: text/plain' -
-data-raw 'This is a test message!'
```

Output:

```txt
{"status":"accepted"}
```

Command:

```sh
ls -1 /tmp/intu/demo
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
output
package.json
package-lock.json
README.md
src
tsconfig.json
```

Command:

```sh
ls -1 /tmp/intu/demo/output
```

Output:

```txt
http-to-file_51d30c5b-730a-4930-8896-0b259fa1a742_20260315T094626.json
```

Command:

```sh
cat /tmp/intu/demo/output/http-to-file_51d30c5b-730a-4930-8896-0b259fa1a74
2_20260315T094626.json
```

Output:

```txt
{"0":"T","1":"h","10":"t","11":"e","12":"s","13":"t","14":" ","15":"m","16":"e","17":"s","18":"s","19":"a","2":"i","20":"g","21":"e","22":"!","3":"s","4":" ","5":"i","6":"s","7":" ","8":"a","9":" ","processedAt":"2026-03-15T01:46:26.444Z","source":"http-to-file"}
```

Command:

```sh
curl -X POST 'localhost:8081/ingest'
```

Output:

```txt
{"status":"accepted"}
```

Expectation:

For the validator to block POST requests with an empty body.

Reality:

The validator failed to block the POST request with an empty body.
### TC-016: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' serve --dir . --profile dev
```

Output:

```txt
{"time":"2026-03-15T09:11:11.362282007+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
...
{"time":"2026-03-15T09:50:20.909873316+08:00","level":"INFO","msg":"channel config changed, reloading","channel":"http-to-file"}
{"time":"2026-03-15T09:50:20.909918056+08:00","level":"INFO","msg":"stopping channel","id":"http-to-file"}
{"time":"2026-03-15T09:50:20.910038136+08:00","level":"INFO","msg":"shared HTTP listener stopped","port":8081}
{"time":"2026-03-15T09:50:20.910052036+08:00","level":"INFO","msg":"channel stopped for hot-reload","channel":"http-to-file"}
{"time":"2026-03-15T09:50:21.010396512+08:00","level":"INFO","msg":"channel disabled, not starting","channel":"http-to-file"}
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' undeploy http-to-file --dir .
```

Output:

```txt
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: text/plain' -
-data-raw 'This is a test message!'
```

Output:

```txt
curl: (7) Failed to connect to localhost port 8081 after 1 ms: Could not connect to server
```

### TC-017: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' serve --dir . --profile dev
```

Output:

```txt
{"time":"2026-03-15T09:11:11.362282007+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
...
{"time":"2026-03-15T10:00:06.152939069+08:00","level":"INFO","msg":"channel config changed, reloading","channel":"http-to-file"}
{"time":"2026-03-15T10:00:06.253287815+08:00","level":"INFO","msg":"channel disabled, not starting","channel":"http-to-file"}
{"time":"2026-03-15T10:04:34.657402147+08:00","level":"INFO","msg":"channel config changed, reloading","channel":"http-to-file"}
{"time":"2026-03-15T10:04:34.757709953+08:00","level":"INFO","msg":"starting channel","id":"http-to-file"}
{"time":"2026-03-15T10:04:34.757804773+08:00","level":"INFO","msg":"shared HTTP listener started","addr":":8081","tls":false}
{"time":"2026-03-15T10:04:34.757820423+08:00","level":"INFO","msg":"HTTP channel registered","port":8081,"path":"/ingest"}
{"time":"2026-03-15T10:04:34.757825353+08:00","level":"INFO","msg":"channel hot-reloaded","channel":"http-to-file"}
```

Opening a browser and going to `localhost:3000`, then clicking the `Channels` tab in the dashboard yields the following screen:

![](whinee/Pasted%20image%2020260315095927.png)

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' disable http-to-file --dir .
```

Output:

```txt
Disabled: http-to-file
```

Refreshing the page, we can now see that the `http-to-file` channel is now disabled.

![](whinee/Pasted%20image%2020260315100205.png)

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' enable http-to-file --dir .
```

Output:

```txt
Enabled: http-to-file
```

Refreshing the page, we can now see that the `http-to-file` channel is now enabled.

![](whinee/Pasted%20image%2020260315100522.png)
### TC-018: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/.env > /dev/null <<'EOF'
# intu Environment Variables
# Active profile (dev | prod)
INTU_PROFILE=dev

# --- Core ---
# Used by docker-compose: postgres://postgres:postgres@postgres:5432/intu?sslmode=disable
INTU_POSTGRES_DSN=postgres://postgres:postgres@localhost:5432/intu?sslmode=disable

# --- Database ---

POSTGRES_USER=intu
POSTGRES_PASSWORD=intu
POSTGRES_DB=intu

# --- Dashboard ---
INTU_DASHBOARD_USER=admin
INTU_DASHBOARD_PASS=admin

# --- Cluster (enable cluster mode for horizontal scaling) ---
# docker-compose sets INTU_REDIS_ADDRESS automatically; override here if needed
# INTU_REDIS_ADDRESS=localhost:6379
# INTU_REDIS_PASSWORD=

# --- AWS (uncomment for S3 storage, CloudWatch logs, AWS Secrets Manager) ---
# INTU_AWS_REGION=us-east-1
# INTU_S3_BUCKET=my-intu-bucket

# --- Secrets Providers (uncomment the provider you use) ---
# VAULT_ADDR=http://127.0.0.1:8200
# VAULT_TOKEN=
# GCP_PROJECT_ID=

# --- Observability (uncomment for OpenTelemetry) ---
# OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317

# --- Log Transports (uncomment as needed) ---
# DD_API_KEY=
# SUMO_HTTP_ENDPOINT=
# ES_URL=http://localhost:9200
# ES_USER=
# ES_PASS=

# --- Access Control (uncomment for LDAP or OIDC) ---
# LDAP_URL=ldap://localhost:389
# LDAP_BASE_DN=dc=example,dc=com
# LDAP_BIND_DN=cn=admin,dc=example,dc=com
# LDAP_BIND_PASSWORD=
# OIDC_ISSUER=https://accounts.google.com
# OIDC_CLIENT_ID=
# OIDC_CLIENT_SECRET=
EOF
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/intu.yaml > /dev/null <<'EOF'
runtime:
  name: intu
  profile: dev
  log_level: info
  mode: standalone
  worker_pool: 4
  storage:
    driver: memory
    postgres_dsn: ${INTU_POSTGRES_DSN}

channels_dir: src/channels
  driver: memory
  mode: full
  memory:
    max_records: 100000       # evicts oldest when exceeded
    max_bytes: 536870912      # 512 MB; evicts oldest when exceeded

destinations:
  file-output:
    type: file
    file:
      directory: ./output
      filename_pattern: "{{channelId}}_{{messageId}}_{{timestamp}}.json"

  hl7-file-output:
    type: file
    file:
      directory: ./output
      filename_pattern: "{{channelId}}_{{messageId}}_{{timestamp}}.hl7"

dashboard:
  enabled: true
  port: 3000
  auth:
    provider: basic
    username: admin
    password: admin

audit:
  enabled: true
  destination: memory
EOF
```

Output:

```txt
```

Command:

```sh
intu serve --dir . --profile dev
```

Output:

```txt
{"time":"2026-03-15T09:11:11.362282007+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
{"time":"2026-03-16T15:32:08.003615606+08:00","level":"INFO","msg":"message received","channel":"http-to-file","messageId":"2fc13a4e-3732-4829-a981-0a2b61e74948","correlationId":"2fc13a4e-3732-4829-a981-0a2b61e74948"}
{"time":"2026-03-16T15:32:08.005024243+08:00","level":"INFO","msg":"script executed","channel":"http-to-file","function":"validate","file":"validator.ts","duration_ms":1.227}
{"time":"2026-03-16T15:32:08.006597679+08:00","level":"INFO","msg":"script executed","channel":"http-to-file","function":"transform","file":"transformer.ts","duration_ms":1.525}
{"time":"2026-03-16T15:32:08.006841678+08:00","level":"INFO","msg":"message processed","channel":"http-to-file","messageId":"2fc13a4e-3732-4829-a981-0a2b61e74948","correlationId":"2fc13a4e-3732-4829-a981-0a2b61e74948","durationMs":3,"destinations":1}
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "This is a test message!"}'
```

Output:

```txt
{"status":"accepted"}
```

Command:

```sh
ls -1 /tmp/intu/demo
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
output
package.json
package-lock.json
README.md
src
tsconfig.json
```

Command:

```sh
ls -1 /tmp/intu/demo/output
```

Output:

```txt
http-to-file_2fc13a4e-3732-4829-a981-0a2b61e74948_20260316T153208.json
```

Command:

```sh
cat /tmp/intu/demo/output/http-to-file_2fc13a4e-3732-4829-a981-0a2b61e74948_20260316T153208.json
```

Output:

```txt
{"message":"This is a test message!","processedAt":"2026-03-16T07:32:08.005Z","source":"http-to-file"}
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "This is the second test message"}'
```

Output:

```txt
{"status":"accepted"}
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json'
```

Output:

```txt
{"status":"accepted"}
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw 'uiiaa'
```

Output:

```txt
{"status":"accepted"}
```

Command:

```sh
intu stats http-to-file --dir .
```

Output:

```txt
Channel: http-to-file
  Enabled:      true
  Listener:     http
  Destinations: [file-output]
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' stats http-to-file --dir . --json
```

Output:

```json
{
  "channel": "http-to-file",
  "destinations": [
    "file-output"
  ],
  "enabled": true,
  "listener": "http"
}
```

### TC-019: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/intu.yaml > /dev/null <<'EOF'
runtime:
  name: intu
  profile: dev
  log_level: info
  mode: standalone
  worker_pool: 4
  storage:
    driver: memory
    postgres_dsn: postgres://intu:intu@localhost:5432/intu

channels_dir: src/channels

message_storage:
  driver: postgres         # memory | postgres | s3
  mode: full               # none | status | full
  postgres:
    dsn: postgres://intu:intu@localhost:5432/intu_message

destinations:
  file-output:
    type: file
    file:
      directory: ./output
      filename_pattern: "{{channelId}}_{{messageId}}_{{timestamp}}.json"

  hl7-file-output:
    type: file
    file:
      directory: ./output
      filename_pattern: "{{channelId}}_{{messageId}}_{{timestamp}}.hl7"

dashboard:
  enabled: true
  port: 3000
  auth:
    provider: basic
    username: admin
    password: admin

audit:
  enabled: true
  destination: memory
EOF
```

Output:

```txt
```

Command:

```sh
tee /tmp/intu/demo/intu.prod.yaml > /dev/null <<'EOF'
# ============================================================================
# intu Production Profile
# Uncomment sections below to enable enterprise features.
# Environment variables (${VAR}) are resolved at startup from .env or OS env.
# ============================================================================

runtime:
  profile: prod
  log_level: info
  mode: standalone           # standalone | cluster
  worker_pool: 8
  storage:
    driver: postgres
    postgres_dsn: postgres://intu:intu@localhost:5432/intu

# --- Message Storage ---------------------------------------------------------
# Controls how messages are persisted globally. Channels can override per-channel.
# Drivers: memory | postgres | s3
# Modes: none (disabled) | status (metadata only, no payloads) | full (full payloads)
message_storage:
  driver: postgres
  mode: full               # none | status (metadata only) | full (payloads + metadata)
  postgres:
    dsn: postgres://intu:intu@localhost:5432/intu_message
    table_prefix: intu_
    max_open_conns: 25
    max_idle_conns: 5

# --- Audit -------------------------------------------------------------------
audit:
  enabled: true
  destination: postgres      # memory | postgres
  events:                    # Restrict to specific events (omit for all)
    - message.reprocess
    - channel.deploy
    - channel.undeploy
    - channel.restart
EOF
```

Output:

```txt
```

Command:

```sh
intu serve --profile prod
```

Output:

```txt
{"time":"2026-03-15T09:11:11.362282007+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
...
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "1"}'
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "2"}'
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "3"}'
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "4"}'
```

Output:

```txt
{"status":"accepted"}
{"status":"accepted"}
{"status":"accepted"}
```

Command:

```sh
intu message list --dir . --channel http-to-file --limit 10
```

Output:

```txt
ID: bebab51e-c210-4077-af07-41713da1cb80  Channel: http-to-file  Stage: sent  Status: SENT  Time: 2026-03-17T19:51:34+08:00
  Content: {"body":"{\"message\":\"4\",\"processedAt\":\"2026-03-17T11:51:34.941Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"bebab51e-c210-4077-af07-41713da1c...(truncated)

ID: bebab51e-c210-4077-af07-41713da1cb80  Channel: http-to-file  Stage: transformed  Status: TRANSFORMED  Time: 2026-03-17T19:51:34+08:00
  Content: {"body":"{\"message\":\"4\",\"processedAt\":\"2026-03-17T11:51:34.941Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"bebab51e-c210-4077-af07-41713da1c...(truncated)

ID: bebab51e-c210-4077-af07-41713da1cb80  Channel: http-to-file  Stage: received  Status: RECEIVED  Time: 2026-03-17T19:51:34+08:00
  Content: {"body":"{\"message\": \"4\"}","channelId":"http-to-file","contentType":"raw","correlationId":"bebab51e-c210-4077-af07-41713da1cb80","http":{"headers":{"Accept":"*/*","Content-Length":"16","Content-Ty...(truncated)

ID: ca38c38a-ad2c-405a-bd3d-84159f3e1acb  Channel: http-to-file  Stage: sent  Status: SENT  Time: 2026-03-17T19:51:04+08:00
  Content: {"body":"{\"message\":\"3\",\"processedAt\":\"2026-03-17T11:51:04.313Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"ca38c38a-ad2c-405a-bd3d-84159f3e1...(truncated)

ID: ca38c38a-ad2c-405a-bd3d-84159f3e1acb  Channel: http-to-file  Stage: transformed  Status: TRANSFORMED  Time: 2026-03-17T19:51:04+08:00
  Content: {"body":"{\"message\":\"3\",\"processedAt\":\"2026-03-17T11:51:04.313Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"ca38c38a-ad2c-405a-bd3d-84159f3e1...(truncated)

ID: ca38c38a-ad2c-405a-bd3d-84159f3e1acb  Channel: http-to-file  Stage: received  Status: RECEIVED  Time: 2026-03-17T19:51:04+08:00
  Content: {"body":"{\"message\": \"3\"}","channelId":"http-to-file","contentType":"raw","correlationId":"ca38c38a-ad2c-405a-bd3d-84159f3e1acb","http":{"headers":{"Accept":"*/*","Content-Length":"16","Content-Ty...(truncated)

ID: 6d3bb6a5-2082-4b03-99c2-852eef125cfe  Channel: http-to-file  Stage: sent  Status: SENT  Time: 2026-03-17T19:50:50+08:00
  Content: {"body":"{\"message\":\"2\",\"processedAt\":\"2026-03-17T11:50:50.757Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"6d3bb6a5-2082-4b03-99c2-852eef125...(truncated)

ID: 6d3bb6a5-2082-4b03-99c2-852eef125cfe  Channel: http-to-file  Stage: transformed  Status: TRANSFORMED  Time: 2026-03-17T19:50:50+08:00
  Content: {"body":"{\"message\":\"2\",\"processedAt\":\"2026-03-17T11:50:50.757Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"6d3bb6a5-2082-4b03-99c2-852eef125...(truncated)

ID: 6d3bb6a5-2082-4b03-99c2-852eef125cfe  Channel: http-to-file  Stage: received  Status: RECEIVED  Time: 2026-03-17T19:50:50+08:00
  Content: {"body":"{\"message\": \"2\"}","channelId":"http-to-file","contentType":"raw","correlationId":"6d3bb6a5-2082-4b03-99c2-852eef125cfe","http":{"headers":{"Accept":"*/*","Content-Length":"16","Content-Ty...(truncated)

ID: 5468316f-19e7-4e84-8c26-54c8c47ba1d0  Channel: http-to-file  Stage: sent  Status: SENT  Time: 2026-03-17T19:47:09+08:00
  Content: {"body":"{\"message\":\"1\",\"processedAt\":\"2026-03-17T11:47:09.269Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba...(truncated)

Total: 10 messages
```

### TC-020: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
intu message get 5468316f-19e7-4e84-8c26-54c8c47ba1d0 --dir .
```

Output:

```txt
ID:            5468316f-19e7-4e84-8c26-54c8c47ba1d0
Correlation:   5468316f-19e7-4e84-8c26-54c8c47ba1d0
Channel:       http-to-file
Stage:         sent
Status:        SENT
Timestamp:     2026-03-17T19:47:09+08:00
Content:
{"body":"{\"message\":\"1\",\"processedAt\":\"2026-03-17T11:47:09.269Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","file":{"directory":"./output","filename":"http-to-file_5468316f-19e7-4e84-8c26-54c8c47ba1d0_20260317T194709.json"},"id":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","metadata":{"destination":"file-output"},"timestamp":"2026-03-17T19:47:09.264866553+08:00","transport":"file","version":"1"}
```
### TC-026: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
'/home/lyra/systems/P01 Lyra Personal/40-49 Hardware and Software/41 Software Projects/41.31 intu/intu' dashboard --dir . --port 4000
```

Output:

```txt
Dashboard running at http://localhost:4000
{"time":"2026-03-16T16:17:55.723208543+08:00","level":"INFO","msg":"dashboard listening","addr":"[::]:4000"}
```

Opening a browser and going to `localhost:4000` yields the following screen:

![](whinee/Pasted%20image%2020260316162342.png)

### TC-021: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
intu message count --dir . --channel http-to-file
```

Output:

```txt
12
```

Command:

```sh
intu message count --dir . --channel http-to-file --status error
```

Output:

```txt
0
```

### TC-022: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
intu reprocess message http-to-file --message-id 5468316f-19e7-4e84-8c26-54c8c47ba1d0 --dir . --dry-run
```

Output:

```txt
Would reprocess message 5468316f-19e7-4e84-8c26-54c8c47ba1d0 from channel http-to-file (stage: sent, status: SENT)
```

Command:

```sh
intu reprocess message http-to-file --message-id 5468316f-19e7-4e84-8c26-54c8c47ba1d0 --dir .
```

Output:

```txt
{"time":"2026-03-17T21:22:26.124435158+08:00","level":"INFO","msg":"node worker pool started","pool_size":4}
{"time":"2026-03-17T21:22:26.125063988+08:00","level":"INFO","msg":"message received","channel":"http-to-file","messageId":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba1d0"}
{"time":"2026-03-17T21:22:26.267850881+08:00","level":"INFO","msg":"script executed","channel":"http-to-file","function":"validate","file":"validator.ts","duration_ms":138.693}
{"time":"2026-03-17T21:22:26.298271767+08:00","level":"INFO","msg":"script executed","channel":"http-to-file","function":"transform","file":"transformer.ts","duration_ms":30.361}
{"time":"2026-03-17T21:22:26.307465153+08:00","level":"INFO","msg":"message processed","channel":"http-to-file","messageId":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","durationMs":182,"destinations":1}
{
  "channel": "http-to-file",
  "new_message_id": "5468316f-19e7-4e84-8c26-54c8c47ba1d0",
  "original_message_id": "5468316f-19e7-4e84-8c26-54c8c47ba1d0",
  "reprocessed": true,
  "timestamp": "2026-03-17T21:22:26+08:00"
}
{"time":"2026-03-17T21:22:26.307572473+08:00","level":"INFO","msg":"message reprocessed","originalID":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","newID":"5468316f-19e7-4e84-8c26-54c8c47ba1d0","channel":"http-to-file"}
{"time":"2026-03-17T21:22:26.317329749+08:00","level":"INFO","msg":"node worker pool stopped"}
```

Command:

```sh
intu message list --dir . --channel http-to-file --limit 3
```

Output:

```txt
ID: 5468316f-19e7-4e84-8c26-54c8c47ba1d0  Channel: http-to-file  Stage: sent  Status: SENT  Time: 2026-03-17T21:22:26+08:00
  Content: {"body":"{\"message\":\"1\",\"processedAt\":\"2026-03-17T13:22:26.281Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba...(truncated)

ID: 5468316f-19e7-4e84-8c26-54c8c47ba1d0  Channel: http-to-file  Stage: transformed  Status: TRANSFORMED  Time: 2026-03-17T21:22:26+08:00
  Content: {"body":"{\"message\":\"1\",\"processedAt\":\"2026-03-17T13:22:26.281Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba...(truncated)

ID: 5468316f-19e7-4e84-8c26-54c8c47ba1d0  Channel: http-to-file  Stage: received  Status: RECEIVED  Time: 2026-03-17T21:22:26+08:00
  Content: {"body":"{\"message\":\"1\",\"processedAt\":\"2026-03-17T11:47:09.269Z\",\"source\":\"http-to-file\"}","channelId":"http-to-file","contentType":"raw","correlationId":"5468316f-19e7-4e84-8c26-54c8c47ba...(truncated)

Total: 3 messages
```

### TC-024: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
intu prune --dir . --all --dry-run
```

Output:

```txt
DRY RUN: Would prune messages for all channels before 2026-02-15
```

Command:

```sh
intu prune --dir . --all
```

Output:

```txt
add --confirm to actually prune data
```

Command:

```sh
intu prune --dir . --all --confirm
```

Output:

```txt
Pruned 0 messages for all channels before 2026-02-15
```

Command:

```sh
intu prune --dir . --all --confirm --before 2026-03-18
```

Output:

```txt
Pruned 12 messages for all channels before 2026-03-18
```

### TC-027: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
rm -rf /tmp/intu/demo/output
```

Output:

```txt
```

Command:

```sh
intu serve --dir .
```

Output:

```txt
{"time":"2026-03-16T21:57:32.896017153+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
```

Command:

```sh
curl -X POST 'localhost:8081/ingest' --header 'Content-Type: application/json' --data-raw '{"message": "This is a test message!"}'
```

Output:

```txt
{"status":"accepted"}
```

Command:

```sh
ls -1 /tmp/intu/demo
```

Output:

```txt
AGENTS.md
dist
docker-compose.yml
Dockerfile
intu.dev.yaml
intu.prod.yaml
intu.yaml
node_modules
output
package.json
package-lock.json
README.md
src
tsconfig.json
```

Command:

```sh
ls -1 /tmp/intu/demo/output
```

Output:

```txt
http-to-file_7a707f21-98fc-4e1f-b972-92c87abaaa75_20260316T220351.json
```

Command:

```sh
cat /tmp/intu/demo/output/http-to-file_7a707f21-98fc-4e1f-b972-92c87abaaa75_20260316T220351.json
```

Output:

```txt
{"message":"This is a test message!","processedAt":"2026-03-16T14:03:51.064Z","source":"http-to-file"}
```
### TC-082: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
intu serve --dir .
```

Output:

```txt
{"time":"2026-03-16T21:57:32.896017153+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
``````

Opening a browser and going to `localhost:3000` yields the following screen:

![](whinee/Pasted%20image%2020260316220604.png)

Logging in with `admin:admin` yields the following screen:

![](whinee/Pasted%20image%2020260316220710.png)

### TC-083: PASS

Command:

```sh
cd /tmp/intu/demo
```

Output:

```txt
```

Command:

```sh
intu serve --dir .
```

Output:

```txt
{"time":"2026-03-16T21:57:32.896017153+08:00","level":"INFO","msg":"building TypeScript channels"}
...
Dashboard running on http://localhost:3000 (auth: basic)
intu engine running. Press Ctrl+C to stop.
``````

Opening a browser and going to `localhost:3000` yields the following screen:

![](whinee/Pasted%20image%2020260316220604.png)

With Firefox' Web Developer tools, logging in with `admin:notadmin` yields the following screen:

![](whinee/Pasted%20image%2020260316221035.png)

Going to `http://localhost:3000/api/messages/7a707f21-98fc-4e1f-b972-92c87abaaa75/payload?stage=received&download=true` yields an HTTP Code 401 Unauthorized, as seen below:

![](whinee/Pasted%20image%2020260316221349.png)

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