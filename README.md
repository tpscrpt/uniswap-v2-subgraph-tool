# Tool for Uniswap V2 Subgraph

Requires a version of [nodejs](https://nodejs.org).

Invoke directly, or with `npm run tool`.

```
tool <command> [options]

Commands:
  tool project <name>                set project name
  tool config <network> <options..>  configure project details for network
  tool auth <token>                  set graph hosted service auth token
  tool deploy <network> <subgraph>   deploy your project's subgraph

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

Examples:
  tool project SushiSwap
  tool config mainnet 2021-11-19 00:01:52 am UTC 0xc0aee..f2ac
  tool auth 20325792affeefa9ed99420b7f353a55
  tool deploy mainnet `whoami`/mainnet-subgraph
```

[Uniswap](https://uniswap.org/) is a decentralized protocol for automated token exchange on Ethereum.

This subgraph dynamically tracks any pair created by the uniswap factory. It tracks of the current state of Uniswap contracts, and contains derived stats for things like historical data and USD prices.

- aggregated data across pairs and tokens,
- data on individual pairs and tokens,
- data on transactions
- data on liquidity providers
- historical data on Uniswap, pairs or tokens, aggregated by day

## Running Locally

Make sure to update package.json settings to point to your own graph account.

## Queries

Below are a few ways to show how to query the uniswap-subgraph for data. The queries show most of the information that is queryable, but there are many other filtering options that can be used, just check out the [querying api](https://thegraph.com/docs/graphql-api). These queries can be used locally or in The Graph Explorer playground.

## Key Entity Overviews

#### UniswapFactory

Contains data across all of Uniswap V2. This entity tracks important things like total liquidity (in ETH and USD, see below), all time volume, transaction count, number of pairs and more.

#### Token

Contains data on a specific token. This token specific data is aggregated across all pairs, and is updated whenever there is a transaction involving that token.

#### Pair

Contains data on a specific pair.

#### Transaction

Every transaction on Uniswap is stored. Each transaction contains an array of mints, burns, and swaps that occured within it.

#### Mint, Burn, Swap

These contain specifc information about a transaction. Things like which pair triggered the transaction, amounts, sender, recipient, and more. Each is linked to a parent Transaction entity.

## Example Queries

### Querying Aggregated Uniswap Data

This query fetches aggredated data from all uniswap pairs and tokens, to give a view into how much activity is happening within the whole protocol.

```graphql
{
  uniswapFactories(first: 1) {
    pairCount
    totalVolumeUSD
    totalLiquidityUSD
  }
}
```
