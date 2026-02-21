export function transform(msg: unknown, ctx: { channelId: string; correlationId: string }): unknown {
  return {
    ...(msg as object),
    processedAt: new Date().toISOString(),
    source: ctx.channelId,
  };
}
