import Card from "interface/card/Card";
import Action from "interface/card/Action";

export default interface Turn {
  onStartTurn: () => void; // ターン開始
  onStartActionPhase: () => Promise<boolean>; // アクションフェーズ開始
  onStartActionEach: (card: Action) => void; //  アクションカード効果前
  onExcuteAction: (card: Action) => Promise<void>; // アクションカード効果発動
  onEndActionEach: () => void; // アクションカード効果後
  onEndActionPhase: () => void; // アクションフェーズ終了
  onStartBuyPhase: () => void; // 購入フェーズ開始
  onStartBuyEach: () => void; // 購入前
  onBuyCard: (card: Card) => void; // 購入カードを選択したとき
  onEndBuyEach: () => void; // 購入後
  onEndBuyPhase: () => void; // 購入フェーズ終了
  onStartClean: () => void; // 片付けフェーズ開始
  onClean: () => void; // 片付け
  onEndClean: () => void; // 片付けフェーズ終了
  onEndTurn: () => void; // ターン終了
}
