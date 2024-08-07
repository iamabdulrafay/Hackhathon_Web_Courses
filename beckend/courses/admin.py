from django.contrib import admin
from .models import Courses, CourseDetails, CourseOutline,CourseVideo

class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', )
    search_fields = ('title', )

class CourseDetailsAdmin(admin.ModelAdmin):
    list_display = ('course', 'course_short_title', 'course_level')
    search_fields = ('course__title', 'course_short_title')



class CourseVideoInline(admin.TabularInline):
    model = CourseVideo
    extra = 1  # Number of empty forms to show initially

class CourseOutlineAdmin(admin.ModelAdmin):
    list_display = ('course', 'section_title')
    search_fields = ('course__title', 'section_title')
    inlines = [CourseVideoInline]


admin.site.register(Courses, CourseAdmin)
admin.site.register(CourseDetails, CourseDetailsAdmin)
admin.site.register(CourseOutline, CourseOutlineAdmin)

