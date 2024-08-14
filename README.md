<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="public/handi-cat.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">🐱 Handi Cat</h3>

  <p align="center">
    Track any Solana transaction in Real-Time
    <br />
    <br />
    <a href="https://t.me/handi_cat_bot"><strong>Use the Telegram bot -></strong></a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://t.me/handi_cat_bot)

Handi Cat is a Telegram bot that can track any Solana wallet in real time, providing relevant information 
of each transaction made in Pump.fun or Raydium including transaction hash, tokens and amount swapped, price of the token in SOL, token market cap and much more.

## Features

* 📈 Real-time tracking of any transaction
* 🔍 Detects Pump.fun or Raydium transactions
* 💰 Gets SOL price of the token swapped
* 📊 Get tokens market cap at the time swapped
* 🤖 Each transaction message includes links to popular Solana trading bots to quickly buy the token
* 🔗 Each transaction provides links to Photon, GMGN and Dex Screener to quickly see the token

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Built With

* 🌐 Node.JS
* 📘 TypeScript
* 📊 Prisma and Prisma Pulse
* 🪙 Solana Web3.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these simple steps to setup Handi Cat locally on your machine

### Prerequisites

**Node version 14.x**

### Steps

1. Clone the repo
   ```sh
   git clone https://github.com/DracoR22/handi-cat_wallet-tracker.git
   ```

2. Install NPM packages
   ```sh
   pnpm install
   ```

3. Rename `.env.example` file to `.env`

4. Go to `supabase.com` and create a free database
  
5. In your `Supabase` dashboard go to `Project Settings` -> `Database` paste the connection string into `SUPABASE_DATABASE_URL` environment variable. Make sure you activate the `pooler connection` and set the
port to `5432`

6. Now you need to [Setup Prisma Pulse with a Supabase database](https://medium.com/@dilsharahasanka/prisma-pulse-hands-on-guide-b220954b3245) for real time database logs

7. After you get your `Prisma Pulse` API key, paste it in the `PULSE_API_KEY` environment variable

8. Create a new `Telegram Bot` using `Bot Father` and get your `BOT_TOKEN`, then paste it in the environment variable

9. That's it! now your local version of Handi Cat is ready, you can also fill the other environment variables to setup a custom RPC or your wallet to get subscription fees


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[@your_twitter](https://twitter.com/your_username) - rdraco039@gmail.com

My solana wallet ff you want support my work - `FCaAuHzjkdWKdepjYHk3ddob8MZDoCV1La6MFcAhC9Rv`

Project Link: [https://github.com/DracoR22/handi-cat_wallet-tracker](https://github.com/DracoR22/handi-cat_wallet-tracker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[telegram-bot]: https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white
[product-screenshot]: public/demo.png