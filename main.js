const yargs = require('yargs')
const fs = require('fs')
const ethers = require('ethers')

const argv = yargs
  .version('1.0.0')
  .usage('$0 <command> [options]')
  .command(
    ['print [network]', 'p'],
    'print configuration',
    yargs => {
      return yargs.example('$0 print').example('$0 print mainnet')
    },
    argv => {
      const config = require('./config.json')
      if (argv.network) {
        if (!config[argv.network]) {
          console.error(`No network "${argv.network}"`)
          process.exit(1)
        } else console.log({ project: config.project, [argv.network]: config[argv.network] })
      } else console.log(config)
    }
  )
  .command({
    command: 'project <name>',
    desc: 'set project name',
    builder: yargs =>
      yargs
        .positional('name', {
          describe: 'the name of your project'
        })
        .example('$0 project SushiSwap'),
    handler: argv => {
      const config = require('./config.json')
      config.project = argv.project
      fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
      console.log(`Project set to "${argv.name}"`)
    }
  })
  .command({
    command: ['config <network> <options..>', 'c'],
    desc: 'configure fatory address and start block for network',
    builder: yargs =>
      yargs
        .positional('options', {
          describe: 'factory address and/or start block'
        })
        .example('$0 config mainnet 0xad85..7ff1 13827220'),
    handler: argv => {
      const config = require('./config.json')
      if (!config[argv.network]) config[argv.network] = {}
      let address = ''
      let addressIndex = null
      argv.options.forEach((option, index) => {
        if (ethers.utils.isAddress(option)) {
          if (address) {
            console.error(`Duplicate addresses:
  ${address}
  ${option}
Please provide a single address`)
            process.exit(1)
          } else {
            addressIndex = index
            address = option
          }
        }
      })
      if (addressIndex) argv.options.splice(addressIndex)
      let date
      if (argv.options.length == 1) {
        if (Number.isNaN(argv.options[0])) {
          console.error(`Not a number: ${argv.options[0]}`)
          process.exit(1)
        }
        date = argv.options[0]
      }
      if (!date && !address) {
        console.error('No address or start point provided')
        process.exit(1)
      } else {
        if (address) config[argv.network].factory = address
        if (date) config[argv.network].start = date
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
      }
    }
  })
  .command(
    'auth <access-token>',
    'store thegraph hosted service access token',
    () => {},
    argv => {
      if (!/[0-9a-fA-F]{32}/.test(argv['access-token'])) {
        console.error(`Invalid token: ${argv['access-token']}`)
        process.exit(1)
      } else {
        console.log('Stored access token.')
        fs.writeFileSync(path.join(__dirname, './.graph-auth'), argv['access-token'])
      }
    }
  )
  .command(
    ['deploy <network> <subgraph> [access-token]', 'd'],
    'deploy to thegraph',
    yargs => {
      return yargs.example('$0 deploy mainnet `whoami`/mainnet-subgraph')
    },
    argv => {
      let accessToken
      if (!argv['access-token']) {
        try {
          accessToken = fs.readFileSync('./.graph-auth').toString('utf8')
        } catch (e) {
          console.error('No access-token provided')
          process.exit(1)
        }
      } else accessToken = argv['access-token']
    }
  )
  .demandCommand()
  .example('$0 print')
  .example('$0 project SushiSwap')
  .example('$0 config mainnet 0xad85..7ff1 13827220')
  .example('$0 auth 20325792affeefa9ed99420b7f353a55')
  .example('$0 deploy mainnet `whoami`/mainnet-subgraph')
  .help().argv

console.log('fin')
//
// 0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac

/**
          const real = date.split('-')[1]
          switch(date.substr(0, 2)) {
            case "ts":
              config[argv.network] = { ...config[argv.network] }
              break;
            case "bn":
              break;
          }

*/
