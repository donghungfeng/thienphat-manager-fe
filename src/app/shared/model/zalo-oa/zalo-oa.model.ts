export class CsReplyModel {
  remain: number = 0;
  total: number = 0;

  constructor(remain: number = 0, total: number = 0) {
    this.remain = remain;
    this.total = total;
  }
}

export class PromotionModel {
  daily_remain: number = 0;
  daily_total: number = 0;
  monthly_remain: number = 0;
  monthly_total: number = 0;

  constructor(
    daily_remain: number = 0,
    daily_total: number = 0,
    monthly_remain: number = 0,
    monthly_total: number = 0
  ) {
    this.daily_remain = daily_remain;
    this.daily_total = daily_total;
    this.monthly_remain = monthly_remain;
    this.monthly_total = monthly_total;
  }
}
export class ZaloOaQuoteModel {
  lastInteraction: string = '';
  csReply: CsReplyModel = new CsReplyModel();
  promotion: PromotionModel = new PromotionModel();

  constructor(
    lastInteraction: string = '',
    csReply: CsReplyModel = new CsReplyModel(),
    promotion: PromotionModel = new PromotionModel()
  ) {
    this.lastInteraction = lastInteraction;
    this.csReply = csReply;
    this.promotion = promotion;
  }
}
