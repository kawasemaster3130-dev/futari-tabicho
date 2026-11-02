# ふたりの旅帖

旅のしおりと思い出を、地図といっしょに残す旅帖アプリ（PWA）。
記録と写真は使う人それぞれの端末の中（IndexedDB）に保存され、サーバーには送られません。

通信するのは、次の3つだけです（Content-Security-Policy でブラウザーが強制）。

- アプリ自身のファイル（このページ）
- 「くわしい地図」や「地図で選ぶ」を使うときの地図画像（国土地理院・OpenStreetMap）
- 「名前でさがす」や「まとめて貼りつけ」で場所をさがすように頼んだときの、**場所の名前だけ**（OpenStreetMap Nominatim・国土地理院の住所検索）

写真や記録の中身は、どこにも送られません。

- 地図ライブラリ: Leaflet（BSD-2-Clause）
- 陸地データ: Natural Earth（public domain）
- フォント: Zen Kaku Gothic New / Shippori Mincho B1 / Barlow Condensed / Zen Maru Gothic / Mochiy Pop One / Fredoka（SIL Open Font License 1.1）
- ライセンスの全文: THIRD_PARTY_LICENSES.txt（アプリの「設定」からも開けます）
