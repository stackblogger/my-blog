from locust import HttpUser, task


class MyBlogApiLoadTester(HttpUser):
    @task
    def test_load(self):
        self.client.get("/blogs/no-provider-for-httpclient-sxuftrd4md")
        self.client.get("/blogs/some-more-title-mvtlmytmh6")
        self.client.get("/blogs/trusting-safe-values-chxyxg754y")
