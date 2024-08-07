# from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializers
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.utils import timezone
from .models import OTP
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from .models import OTP
from .serializers import UserSerializers
from django.contrib.auth import authenticate

@api_view(["POST"])
def register(request):
    try:
        serializers = UserSerializers(data=request.data)
        if serializers.is_valid():
            # Check if user already exists
            if User.objects.filter(email=request.data["email"]).exists():
                 return Response({"detail": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create a user instance but don't save to database yet
            user = User(username=request.data["username"], email=request.data["email"])
            user.set_password(request.data["password"])
            user.save()
            
            # Generate OTP
            otp_code = OTP.generate_otp()
            otp, created = OTP.objects.get_or_create(user=user)
            otp.otp = otp_code
            otp.save()
            
            # Send OTP via email
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp_code}. It is valid for 10 minutes.',
                'from@example.com',  # Replace with your actual sender email
                [request.data["email"]],
                fail_silently=False,
            )
            
            return Response({"message": "OTP sent to your email. Verify to complete registration."})
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        # Log the exception and return a generic error message
        print(f"An error occurred: {e}")  # For development, consider using logging
        return Response({"detail": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(["POST"])
@api_view(["POST"])
def login(request):
    print("Received request")
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        print("Email or password missing")
        return Response({"detail": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        print("User found")
        
        if not user.check_password(password):
            print("Invalid password")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    except User.DoesNotExist:
        print("User does not exist")
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    token, created = Token.objects.get_or_create(user=user)
    print("Token created or retrieved")
    
    serializer = UserSerializers(instance=user)
    print("User serialized")

    return Response({"token": token.key, "user": serializer.data})
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed! for {}".format(request.user.email))


@api_view(["POST"])
def verify_otp(request):
    email = request.data.get("email")
    otp_code = request.data.get("otp")
    
    user = get_object_or_404(User, email=email)
    otp = OTP.objects.filter(user=user).first()
    
    if not otp or not otp.is_valid() or otp.otp != otp_code:
        return Response({"detail": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Mark OTP as used or delete it
    otp.delete()
    
    # Token creation
    token, created = Token.objects.get_or_create(user=user)
    serializers = UserSerializers(instance=user)
    return Response({"token": token.key, "user": serializers.data})