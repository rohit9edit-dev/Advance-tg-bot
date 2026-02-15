import asyncio
import logging
from aiogram import Dispatcher, types
from aiogram.filters import Command
from core.dispatcher import setup_dispatcher
from core.middleware import AuthMiddleware, ForceJoinMiddleware
from core.scheduler import scheduler
from handlers.start import router as start_router
from handlers.upload import router as upload_router
from handlers.download import router as download_router
from handlers.links import router as links_router
from handlers.user import router as user_router
from handlers.admin import router as admin_router
from handlers.errors import router as error_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

async def main():
    # Setup dispatcher
    dp = setup_dispatcher()
    
    # Register middlewares
    dp.message.middleware(AuthMiddleware())
    dp.message.middleware(ForceJoinMiddleware())
    
    # Register routers
    dp.include_router(start_router)
    dp.include_router(upload_router)
    dp.include_router(download_router)
    dp.include_router(links_router)
    dp.include_router(user_router)
    dp.include_router(admin_router)
    dp.include_router(error_router)
    
    # Start scheduler
    await scheduler.start()
    
    # Start polling
    from core.client import get_telegram_bot
    bot = get_telegram_bot()
    
    logger.info("Starting bot...")
    try:
        await dp.start_polling(bot)
    finally:
        # Ensure scheduler is stopped when bot shuts down
        await scheduler.stop()

if __name__ == "__main__":
    asyncio.run(main())
