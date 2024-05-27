// 根据角色动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/api/v1/system/login",
    method: "post",
    response: ({ body }) => {
      if (body.captchaCode !== "zero-admin") {
        return {
          code: 401,
          msg: "登录失败，请输入”zero-admin“验证码"
        };
      }
      // 获取当前时间
      const now = new Date();
      // 获取当前时间的时间戳（毫秒级）
      const currentTimeInMillis = now.getTime();
      // 计算10小时后的时间戳（毫秒级）
      const tenHoursInMillis = 10 * 60 * 60 * 1000; // 10小时转换为毫秒
      const futureTimeInMillis = currentTimeInMillis + tenHoursInMillis;
      // 将毫秒级时间戳转换为秒级时间戳
      const futureTimeInSeconds = Math.floor(futureTimeInMillis / 1000);

      if (body.username === "admin") {
        return {
          code: 200,
          msg: "success",
          data: {
            avatar: "https://avatars.githubusercontent.com/u/44761321",
            username: "admin",
            nickname: "小铭",
            // 一个用户可能有多个角色
            roles: ["admin"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: futureTimeInSeconds
          }
        };
      } else {
        return {
          code: 200,
          msg: "success",
          data: {
            avatar: "https://avatars.githubusercontent.com/u/52823142",
            username: "common",
            nickname: "小林",
            roles: ["common"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
            expires: futureTimeInSeconds
          }
        };
      }
    }
  },
  {
    url: "/api/v1/system/login/captcha",
    method: "get",
    response: () => {
      return {
        code: 200,
        msg: "success",
        data: {
          captchaKey: "zero-admin",
          captchaBase64:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAYAAAAZUZThAAAAAXNSR0IArs4c6QAAC/VJREFUeF7tnHesVMUXx4feQZBegwIiRQhIRzoSqkHESAKR3pEWepPeS6gJvQoKSNEAoUgvYqQovSi9hdB7/eUzydzf7H1377u7wL77fHP+wbc75cw58z111nivX79+LQwZCRgJOEogngGIuRlGAsElYABiboeRgIsEDEDM9TASMAAxd8BIIDwJGA8SntzMrDgiAQOQOKJoc8zwJGAAEp7czKw4IgEDkDiiaHPM8CRgABKe3MysOCIBA5A4omhzzPAkYAASntxi1ayDBw+Kli1bSp5r1aolhg4dGlH+16xZI4YMGSL3bN26tWjTpk1E93+TzQxA3kR6sWTutm3bROXKlSW3X3/9tfjxxx8jyvmsWbMkMKD+/ftHHKBvclgDkDeRXiyZawASvqIMQMKXXayZGdMA+fPPP8XPP/8s5YUnq1atWqyRnQFIrFFV+IzGNEDC5zzmZ8ZqgFy6dElcvXpV5MmTR6RNmzZkaT569EgcPXpUZMuWTWTNmjXo/MePH4uzZ8+KV69eiXz58omkSZOGvJfXCbdv3xb//POP3Ov9998XuXPnFvHixfM0/eXLl1IeV65cER9++KGcD4UDkBcvXohjx47JNZCPE/FTolOnTomnT5/K/VKkSOGJTy+D7t27J06ePCly5swpMmXK5GXKOxkTMYDkyJFDPHv2zPMhEidOLAWUPHnygDl///236NWrl9i1a5e4f/++9V327NnFV199JRPAlClTRtln3rx5onfv3vLzDRs2iEWLFomJEyda48qVKycWLFggFQ1x2RYuXChGjRolL4FOBQoUEK1atRKdOnUSCRIk8HymYANXrlwppk+fLv7444+AMzE+VapUsgI1ePBg+d9OBNCnTZsmxo0bJ27cuGENgc8OHToI/g2WpC9ZskR069ZNzlm/fr3UEWem8qTogw8+EPXq1ZOfJ0mSRO6BDtatWxewX40aNSQfSoZq/rJly0Tnzp3lnz179hTdu3e31i5YsKC4efOmqFKlioCXkSNHip9++kn89ddf1piMGTOKJk2aiGHDhr1T4+Qk24gBxKsV1JnEiqhLgUWdPHmy6Nq1q+uFRJkopESJEgHjJk2aZM2tWbOmvAx2wiNhLa9duyZq164tDhw44LoX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"
        }
      };
    }
  },
  {
    url: "/api/v1/system/login/logout",
    method: "delete",
    response: () => {
      return {
        code: 200,
        msg: "success"
      };
    }
  }
]);
