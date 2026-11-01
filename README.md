# ふたりの旅帖

旅のしおりと思い出を、地図といっしょに残す旅帖アプリ（PWA）。
記録と写真は使う人それぞれの端末の中（IndexedDB）に保存され、サーバーには送られません。

通信するのは、アプリ自身と、「くわしい地図」をオンにしたときの地図画像（国土地理院・OpenStreetMap）だけです（Content-Security-Policy でブラウザーが強制）。

- 地図ライブラリ: Leaflet（BSD-2-Clause）
- 陸地データ: Natural Earth（public domain）
- フォント: Fredoka / Mochiy Pop One / Zen Maru Gothic（SIL Open Font License 1.1）
