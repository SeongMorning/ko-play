package com.edu.koplay.scheduler;

import com.edu.koplay.websocket.GameRoomManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class GameQueManageScheduler {
    Logger logger = LoggerFactory.getLogger(GameQueManageScheduler.class);

    @Scheduled(cron = "*/1 * * * * ?")
    public void queManageScheduler() {
        try {
//            logger.info("스케쥴링");
            while (GameRoomManager.waitingQueue.size() >= 2) {
                logger.info("여기 배정했어요");
                String id1 = GameRoomManager.waitingQueue.poll();
                String id2 = GameRoomManager.waitingQueue.poll();
                System.out.println(id1 + id2);
                GameRoomManager.userIdAndRoom.put(id1, GameRoomManager.roomId);
                GameRoomManager.userIdAndRoom.put(id2, GameRoomManager.roomId);
                logger.info("배정한 roomId" + GameRoomManager.roomId);
                GameRoomManager.roomId += 1;
                logger.info("증가된 roomId"+GameRoomManager.roomId);
            }
        } catch (Exception e) {
            logger.error("Batch job failed: {}", e.getMessage(), e);
        }
    }
}
