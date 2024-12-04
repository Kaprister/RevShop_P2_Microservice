package com.revature.order.service;

import com.revature.order.dtos.MailRequestDto;
import com.revature.order.feigns.AuthService;
import com.revature.order.feigns.NotificationService;
import com.revature.order.model.Order;
import com.revature.order.model.User;
import org.springframework.beans.factory.annotation.Autowired;

public class MailService {

    private final NotificationService notificationService;

    public MailService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }



    public void sendOrderStatusChangeEmail(User user, Order order) {
        String logoUrl = "https://res.cloudinary.com/dbleggv6z/image/upload/v1731652628/RevShop/logo9090_qzlz4t.png";
        String subject = "Order Status Update - RevShop";

        String content = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.5;'>"
                + "<div style='text-align: center; margin-bottom: 20px;'>"
                + "<img src='" + logoUrl + "' alt='RevShop Logo' style='width: 150px; height: auto;' />"
                + "</div>"
                + "<h1 style='text-align: center; color: #444;'>Order Status Updated</h1>"
                + "<p style='text-align: center;'>Dear " + user.getFirstName() + ",</p>"
                + "<p>Your order with ID <strong>" + order.getId() + "</strong> has been updated to the status: <strong>" + order.getStatus() + "</strong>.</p>"
                + "<p>If you have any questions, feel free to contact our support team.</p>"
                + "<p style='text-align: center;'><strong>Thank you for choosing RevShop!</strong></p>"
                + "<p style='text-align: center;'>RevShop Team</p>"
                + "</div>";

        // Create and send the email
        MailRequestDto mail = MailRequestDto.builder()
                .subject(subject)
                .body(content)
                .to(user.getEmail())
                .build();

        notificationService.sendEmail(mail);
    }
}
