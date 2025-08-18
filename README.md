# ishikawa-lab-website
石川・何研究室の公式サイトのソースコードです。  
2025年に大規模リニューアルリリース予定です。

## 使用技術
- HTML / CSS / JavaScript（フロントエンドのみの静的サイト）
- JSONによるデータ管理（ニュース・研究・業績・メンバー情報をJSONでまとめ、各ページで読み込む）
- デザインは Figma で作成済み([Figma](https://www.figma.com/design/6ZfSHxZCg8mhkg74R0XxKN/ishikawa-lab-website?node-id=576-923&t=mzFruA42YhejmUOL-1))

## データ管理・運用方針
- 各ページは対応するJSONファイルを読み込んで内容を表示
- データはできるだけシンプルに管理し、未来の研究室メンバーが更新しやすい構成とした
- 新しいニュースや受賞情報を追加する場合は、dataフォルダ内のJSONを更新する

## ディレクトリ構成
📁 ishikawa-lab-website
┣ index.html …サイトTOPページ  
┣ news.html …ニュース情報ページ  
┣ research.html …研究テーマ・共同研究ページ  
┣ publication.html …研究業績ページ  
┣ member.html …研究室メンバーページ  
┣ contents.html …研究関連コンテンツページ  
┣ _header.html …共通ヘッダー  
┣ _footer.html …共通フッター  
┃  
┣ 📁 member  
┃ ┣ ishikawa.html …石川先生紹介  
┃ ┣ heyuanyuan.html …何先生紹介  
┃ ┗ obog.html …OBOGページ  
┃  
┣ 📁 contents  
┃ ┣ oyaishi/oyaishi.html …大谷石カタログ  
┃ ┣ recruit/recruit.html …大学院生募集ページ  
┃ ┗ award/ …受賞関連ページ  
┃  
┣ 📁 images …画像管理（faculty, favicon, ogp, obog, event）  
┣ 📁 css …スタイルシート  
┣ 📁 js …スクリプト  
┗ 📁 data …JSONデータ（news, research, publication, member）
