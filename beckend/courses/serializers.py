from rest_framework import serializers
from .models import Courses, CourseDetails, CourseOutline,CourseVideo

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = '__all__'

class CourseDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDetails
        fields = '__all__'


class CourseVideoSerializer(serializers.ModelSerializer):
  

    class Meta:
        model = CourseVideo
        fields = ['id', 'title', 'video_file', 'video_content']
class CourseOutlineSerializer(serializers.ModelSerializer):
     course_videos = CourseVideoSerializer(many=True, read_only=True)

     class Meta:
        model = CourseOutline
        fields = '__all__'

# class CourseVideoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CourseVideo
#         fields = '__all__'
