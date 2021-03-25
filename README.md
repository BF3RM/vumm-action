# VU Mod Manager Action
GitHub Action for VU Mod Manager\
<a href="https://github.com/BF3RM/vumm-action/releases/latest">
  <img src="https://img.shields.io/github/release/BF3RM/vumm-action.svg?logo=github" alt="releases">
</a>
<a href="https://github.com/BF3RM/vumm-action/actions/workflows/test.yml">
  <img src="https://img.shields.io/github/workflow/status/BF3RM/vumm-action/test?label=test&logo=github" alt="status">
</a>
<a href="https://codecov.io/gh/BF3RM/vumm-action">
  <img alt="Codecov" src="https://img.shields.io/codecov/c/gh/BF3RM/vumm-action?logo=codecov">
</a>

## Usage
This GitHub Action automatically downloads and installs the [vumm](https://github.com/BF3RM/vumm-cli) tool and runs the publish command on it.\
An example workflow can be seen below
```yml
name: publish

on:
  push:
    tags:
      - '*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      ... your build steps

      - name: Publish
        uses: BF3RM/vumm-action
        env:
          VUMM_TOKEN: ${{ secrets.VUMM_TOKEN }}
```

## Inputs
The following inputs can be used as `step.with` keys
| Name      | Default  | Description                                 |
| --------- | -------- | ------------------------------------------- |
| `version` | `latest` | VU Mod Manager version                      |
| `tag`     | `latest` | Tag to publish to (latest, dev, qa, etc...) |
| `workdir` | `.`      | Working directory                           |

## Environment
The following environment variables can be used as `step.env` keys
| Name            | Description                             |
| --------------- | --------------------------------------- |
| `VUMM_TOKEN`    | Access token of VUMM for authenticating |
| `VUMM_REGISTRY` | Custom registry url                     |

## License
The Venice Unleashed Mod Manager Registry is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.