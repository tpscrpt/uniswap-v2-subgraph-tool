const yargs = require('yargs')

const argv = yargs
  .version('1.0.0')
  .usage('$0 <command> [options]')
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
      console.log({ argv })
    }
  })
  .command({
    command: 'config <network> <options..>',
    desc: 'configure project details for network',
    builder: yargs =>
      yargs
        .positional('options', {
          describe: 'factory address and/or start date'
        })
        .example('$0 config mainnet 2021/12/25 12:00:00 am PST 0xad85..7ff1')
        .example('$0 config mainnet 13827220')
        .example('$0 config mainnet 0xad85..7ff1 1639808344'),
    handler: argv => {
      console.log({ argv })
    }
  })
  .command(
    'auth <token>',
    'set graph hosted service auth token',
    () => {},
    argv => {
      console.log({ argv })
    }
  )
  .command(
    'deploy <network> <subgraph>',
    "deploy your project's subgraph",
    yargs => {
      return yargs.example('$0 deploy mainnet `whoami`/mainnet-subgraph')
    },
    argv => {
      console.log(argv)
    }
  )
  .demandCommand()
  .example('$0 project SushiSwap')
  .example('$0 config mainnet 2021-11-19 00:01:52 am UTC 0xc0aee..f2ac')
  .example('$0 auth 20325792affeefa9ed99420b7f353a55')
  .example('$0 deploy mainnet `whoami`/mainnet-subgraph')
  .help().argv

console.log('fin')
//
// 0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac
