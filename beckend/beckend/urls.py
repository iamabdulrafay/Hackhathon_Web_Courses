
from django.contrib import admin
from django.urls import path,include
from api.views import login ,register,test_token,verify_otp
# from courses.views import CourseList,CourseDetailsListView,CourseOutlineListView
from django.conf import settings


from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/',login),
    path('register/',register),
    path('test_token/',test_token),
    path('verify-otp/', verify_otp),
    # path('course_list/', CourseList.as_view(), name='course-list'),
    # path('course_list/<int:pk>/', CourseDetail.as_view(), name='course-detail'),
  
    # path('course_details/<int:pk>/', CourseDetailsListView.as_view(), name='course-details-list'),
    # path('course_outlines/<int:pk>/', CourseOutlineListView.as_view(), name='course-outlines-list'),
    path("api/v1/",include("courses.urls"))
   
]

if  settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)