from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Order, OrderItem
import json
from rest_framework.decorators import api_view
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework import status

@csrf_exempt
@api_view(['POST'])
def create_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Check if the user exists
            try:
                user = User.objects.get(username=data['username'])
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

            # Create the order
            order = Order.objects.create(user=user, total_price=data['totalPrice'])

            # Add items to the order
            for item in data['cartItems']:
                OrderItem.objects.create(
                    order=order,
                    product_name=item['product_name'],
                    price=item['price'],
                    quantity=item['quantity'],
                    image=item.get('image')  # Include image if it's part of the item
                )

            return JsonResponse({'message': 'Order created successfully!'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing key: {str(e)}'}, status=400)
        except Exception as e:
            # Log the exception for debugging
            print(f"Error creating order: {str(e)}")
            return JsonResponse({'error': 'Server error. Please try again later.'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@api_view(['GET'])
def recent_orders(request):
    try:
        orders = Order.objects.all()  
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
