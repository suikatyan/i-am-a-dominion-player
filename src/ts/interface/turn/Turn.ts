export default interface Turn {
  onStartTurn: () => void; // ターン開始
  onStartActionPhase: () => void; // アクションフェーズ開始
  onStartActionEach: () => void; //  アクションカード効果前
  onExcuteAction: () => void; // 自身のカードが選択されたとき
  onEndActionEach: () => void; // アクションカード効果後
  onEndActionPhase: () => void; // アクションフェーズ終了
  onStartBuyPhase: () => void; // 購入フェーズ開始
  onStartBuyEach: () => void; // 購入前
  onBuyCard: () => void; // 購入カードを選択したとき
  onEndBuyEach: () => void; // 購入後
  onEndBuyPhase: () => void; // 購入フェーズ終了
  onStartClean: () => void; // 片付けフェーズ開始
  onEndClean: () => void; // 片付けフェーズ終了
  onEndTurn: () => void; // ターン終了
}
