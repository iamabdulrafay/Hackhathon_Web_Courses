from django.urls import path,include
from .views import CourseDetailsListView ,CourseOutlineViewSet,CourseList
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'courses', CourseList, basename='courses')
router.register(r'course_details', CourseDetailsListView, basename='course-details')
router.register(r'course_outlines', CourseOutlineViewSet, basename='course-outlines')

# router.register(r'course_videos', CourseVideoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
