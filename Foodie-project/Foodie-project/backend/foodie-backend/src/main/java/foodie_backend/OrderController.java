package foodie_backend;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/orders")
public class OrderController {

   private final List<Map<String, Object>> orders = new ArrayList<>();

    // Place a new order
    @PostMapping
    public Map<String, Object> placeOrder(
            @RequestBody Map<String, Object> order) {

        orders.add(order);

        return Map.of(
            "message", "Order placed successfully!",
            "order", order
        );
    }

    // Get all orders
    @GetMapping
    public List<Map<String, Object>> getOrders() {
        return orders;
    }
}