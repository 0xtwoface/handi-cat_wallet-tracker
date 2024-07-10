interface NativeParserInterface {
    description: string,
    type: string | undefined,
    balanceChange: string | number | undefined,
    signature: string,
    tokenTransfers: {
      tokenInMint: string,
      tokenOutMint: string,
      tokenAmountIn: string,
      tokenAmountOut: string
    }
}