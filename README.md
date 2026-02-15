# Telegram File Storage & Secure Link Management Bot

A production-grade Telegram bot that stores files in Telegram channels and generates secure links for sharing.

## Features

- 📁 Store files in private Telegram channels
- 🔐 Generate secure, time-limited links
- 👥 User authentication and role management
- 🔒 Force join required channels
- 📊 Analytics and usage tracking
- 🛡️ Built-in security and anti-abuse measures
- 🔄 Plugin system for extensibility
- 📈 Horizontal scaling support

## Architecture

The bot follows a clean architecture pattern with the following components:

1. **Core Layer** - Bot engine, dispatcher, middleware
2. **Handlers Layer** - Message and callback handlers
3. **Services Layer** - Business logic
4. **Storage Layer** - Telegram channel management
5. **Database Layer** - PostgreSQL storage
6. **Cache Layer** - Redis caching
7. **Utils Layer** - Helper functions

## Installation

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Set up environment variables in `.env`
4. Run database migrations: `python scripts/migrate.py`
5. Start the bot: `python bot.py`

## Configuration

Create a `.env` file with the following variables:

```env
BOT_TOKEN=your_bot_token_here
REQUIRED_CHANNEL_1=@channel1
REQUIRED_CHANNEL_2=@channel2
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=telegram_storage_bot
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your_secret_key_here
ENCRYPTION_KEY=your_encryption_key_here
