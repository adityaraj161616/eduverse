/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/models/user */ \"(rsc)/./models/user.ts\");\n\n\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                try {\n                    await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                    const user = await _models_user__WEBPACK_IMPORTED_MODULE_5__.User.findOne({\n                        email: credentials.email\n                    });\n                    if (!user) {\n                        return null;\n                    }\n                    const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.password);\n                    if (!isPasswordValid) {\n                        return null;\n                    }\n                    return {\n                        id: user._id.toString(),\n                        email: user.email,\n                        name: user.name,\n                        role: user.role,\n                        image: user.profile?.avatar || \"/placeholder-avatar.png\",\n                        provider: \"credentials\"\n                    };\n                } catch (error) {\n                    console.error(\"Auth error:\", error);\n                    return null;\n                }\n            }\n        })\n    ],\n    callbacks: {\n        async signIn ({ user, account, profile }) {\n            if (account?.provider === \"google\") {\n                try {\n                    await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                    const existingUser = await _models_user__WEBPACK_IMPORTED_MODULE_5__.User.findOne({\n                        email: user.email\n                    });\n                    if (!existingUser) {\n                        // Create new user with Google profile photo\n                        await _models_user__WEBPACK_IMPORTED_MODULE_5__.User.create({\n                            name: user.name,\n                            email: user.email,\n                            role: \"student\",\n                            profile: {\n                                avatar: user.image || \"/placeholder-avatar.png\",\n                                bio: \"\"\n                            },\n                            provider: \"google\",\n                            googleId: account.providerAccountId,\n                            enrolledCourses: [],\n                            completedCourses: [],\n                            notifications: []\n                        });\n                        console.log(\"New Google user created:\", user.email);\n                    } else {\n                        // Update existing user with latest Google photo\n                        await _models_user__WEBPACK_IMPORTED_MODULE_5__.User.findByIdAndUpdate(existingUser._id, {\n                            \"profile.avatar\": user.image || existingUser.profile.avatar,\n                            provider: \"google\",\n                            googleId: account.providerAccountId\n                        });\n                        console.log(\"Google user updated:\", user.email);\n                    }\n                } catch (error) {\n                    console.error(\"Google sign in error:\", error);\n                    return false;\n                }\n            }\n            return true;\n        },\n        async jwt ({ token, user, account }) {\n            if (user) {\n                token.role = user.role;\n                token.provider = account?.provider || \"credentials\";\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n                session.user.provider = token.provider;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        signUp: \"/register\"\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTBEO0FBQ0g7QUFDVTtBQUNwQztBQUNPO0FBQ0E7QUFFN0IsTUFBTU0sY0FBK0I7SUFDMUNDLFdBQVc7UUFDVE4sc0VBQWNBLENBQUM7WUFDYk8sVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7WUFDdENDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CO1FBQ2hEO1FBQ0FYLDJFQUFtQkEsQ0FBQztZQUNsQlksTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLElBQUk7b0JBQ0YsTUFBTWYsa0RBQVNBO29CQUNmLE1BQU1pQixPQUFPLE1BQU1oQiw4Q0FBSUEsQ0FBQ2lCLE9BQU8sQ0FBQzt3QkFBRU4sT0FBT0QsWUFBWUMsS0FBSztvQkFBQztvQkFFM0QsSUFBSSxDQUFDSyxNQUFNO3dCQUNULE9BQU87b0JBQ1Q7b0JBRUEsTUFBTUUsa0JBQWtCLE1BQU1wQix3REFBYyxDQUFDWSxZQUFZSSxRQUFRLEVBQUVFLEtBQUtGLFFBQVE7b0JBRWhGLElBQUksQ0FBQ0ksaUJBQWlCO3dCQUNwQixPQUFPO29CQUNUO29CQUVBLE9BQU87d0JBQ0xFLElBQUlKLEtBQUtLLEdBQUcsQ0FBQ0MsUUFBUTt3QkFDckJYLE9BQU9LLEtBQUtMLEtBQUs7d0JBQ2pCRixNQUFNTyxLQUFLUCxJQUFJO3dCQUNmYyxNQUFNUCxLQUFLTyxJQUFJO3dCQUNmQyxPQUFPUixLQUFLUyxPQUFPLEVBQUVDLFVBQVU7d0JBQy9CQyxVQUFVO29CQUNaO2dCQUNGLEVBQUUsT0FBT0MsT0FBTztvQkFDZEMsUUFBUUQsS0FBSyxDQUFDLGVBQWVBO29CQUM3QixPQUFPO2dCQUNUO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RFLFdBQVc7UUFDVCxNQUFNQyxRQUFPLEVBQUVmLElBQUksRUFBRWdCLE9BQU8sRUFBRVAsT0FBTyxFQUFFO1lBQ3JDLElBQUlPLFNBQVNMLGFBQWEsVUFBVTtnQkFDbEMsSUFBSTtvQkFDRixNQUFNNUIsa0RBQVNBO29CQUNmLE1BQU1rQyxlQUFlLE1BQU1qQyw4Q0FBSUEsQ0FBQ2lCLE9BQU8sQ0FBQzt3QkFBRU4sT0FBT0ssS0FBS0wsS0FBSztvQkFBQztvQkFFNUQsSUFBSSxDQUFDc0IsY0FBYzt3QkFDakIsNENBQTRDO3dCQUM1QyxNQUFNakMsOENBQUlBLENBQUNrQyxNQUFNLENBQUM7NEJBQ2hCekIsTUFBTU8sS0FBS1AsSUFBSTs0QkFDZkUsT0FBT0ssS0FBS0wsS0FBSzs0QkFDakJZLE1BQU07NEJBQ05FLFNBQVM7Z0NBQ1BDLFFBQVFWLEtBQUtRLEtBQUssSUFBSTtnQ0FDdEJXLEtBQUs7NEJBQ1A7NEJBQ0FSLFVBQVU7NEJBQ1ZTLFVBQVVKLFFBQVFLLGlCQUFpQjs0QkFDbkNDLGlCQUFpQixFQUFFOzRCQUNuQkMsa0JBQWtCLEVBQUU7NEJBQ3BCQyxlQUFlLEVBQUU7d0JBQ25CO3dCQUNBWCxRQUFRWSxHQUFHLENBQUMsNEJBQTRCekIsS0FBS0wsS0FBSztvQkFDcEQsT0FBTzt3QkFDTCxnREFBZ0Q7d0JBQ2hELE1BQU1YLDhDQUFJQSxDQUFDMEMsaUJBQWlCLENBQUNULGFBQWFaLEdBQUcsRUFBRTs0QkFDN0Msa0JBQWtCTCxLQUFLUSxLQUFLLElBQUlTLGFBQWFSLE9BQU8sQ0FBQ0MsTUFBTTs0QkFDM0RDLFVBQVU7NEJBQ1ZTLFVBQVVKLFFBQVFLLGlCQUFpQjt3QkFDckM7d0JBQ0FSLFFBQVFZLEdBQUcsQ0FBQyx3QkFBd0J6QixLQUFLTCxLQUFLO29CQUNoRDtnQkFDRixFQUFFLE9BQU9pQixPQUFPO29CQUNkQyxRQUFRRCxLQUFLLENBQUMseUJBQXlCQTtvQkFDdkMsT0FBTztnQkFDVDtZQUNGO1lBQ0EsT0FBTztRQUNUO1FBQ0EsTUFBTWUsS0FBSSxFQUFFQyxLQUFLLEVBQUU1QixJQUFJLEVBQUVnQixPQUFPLEVBQUU7WUFDaEMsSUFBSWhCLE1BQU07Z0JBQ1I0QixNQUFNckIsSUFBSSxHQUFHUCxLQUFLTyxJQUFJO2dCQUN0QnFCLE1BQU1qQixRQUFRLEdBQUdLLFNBQVNMLFlBQVk7WUFDeEM7WUFDQSxPQUFPaUI7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEMsUUFBUTdCLElBQUksQ0FBQ0ksRUFBRSxHQUFHd0IsTUFBTUUsR0FBRztnQkFDM0JELFFBQVE3QixJQUFJLENBQUNPLElBQUksR0FBR3FCLE1BQU1yQixJQUFJO2dCQUM5QnNCLFFBQVE3QixJQUFJLENBQUNXLFFBQVEsR0FBR2lCLE1BQU1qQixRQUFRO1lBQ3hDO1lBQ0EsT0FBT2tCO1FBQ1Q7SUFDRjtJQUNBRSxPQUFPO1FBQ0xoQixRQUFRO1FBQ1JpQixRQUFRO0lBQ1Y7SUFDQUgsU0FBUztRQUNQSSxVQUFVO0lBQ1o7SUFDQUMsUUFBUTlDLFFBQVFDLEdBQUcsQ0FBQzhDLGVBQWU7QUFDckMsRUFBQztBQUVELE1BQU1DLFVBQVV6RCxnREFBUUEsQ0FBQ007QUFFaUIiLCJzb3VyY2VzIjpbIkQ6XFxHSXRcXGVkdXZlcnNlXFxhcHBcXGFwaVxcYXV0aFxcWy4uLm5leHRhdXRoXVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IHR5cGUgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlXCJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCJcbmltcG9ydCB7IGNvbm5lY3REQiB9IGZyb20gXCJAL2xpYi9kYlwiXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIkAvbW9kZWxzL3VzZXJcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCEsXG4gICAgfSksXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBjb25uZWN0REIoKVxuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSlcblxuICAgICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZClcblxuICAgICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgICAgaW1hZ2U6IHVzZXIucHJvZmlsZT8uYXZhdGFyIHx8IFwiL3BsYWNlaG9sZGVyLWF2YXRhci5wbmdcIixcbiAgICAgICAgICAgIHByb3ZpZGVyOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJBdXRoIGVycm9yOlwiLCBlcnJvcilcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcbiAgICAgIGlmIChhY2NvdW50Py5wcm92aWRlciA9PT0gXCJnb29nbGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IGNvbm5lY3REQigpXG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IHVzZXIuZW1haWwgfSlcblxuICAgICAgICAgIGlmICghZXhpc3RpbmdVc2VyKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHVzZXIgd2l0aCBHb29nbGUgcHJvZmlsZSBwaG90b1xuICAgICAgICAgICAgYXdhaXQgVXNlci5jcmVhdGUoe1xuICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICByb2xlOiBcInN0dWRlbnRcIixcbiAgICAgICAgICAgICAgcHJvZmlsZToge1xuICAgICAgICAgICAgICAgIGF2YXRhcjogdXNlci5pbWFnZSB8fCBcIi9wbGFjZWhvbGRlci1hdmF0YXIucG5nXCIsIC8vIFVzZSBHb29nbGUgcGhvdG9cbiAgICAgICAgICAgICAgICBiaW86IFwiXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHByb3ZpZGVyOiBcImdvb2dsZVwiLFxuICAgICAgICAgICAgICBnb29nbGVJZDogYWNjb3VudC5wcm92aWRlckFjY291bnRJZCxcbiAgICAgICAgICAgICAgZW5yb2xsZWRDb3Vyc2VzOiBbXSxcbiAgICAgICAgICAgICAgY29tcGxldGVkQ291cnNlczogW10sXG4gICAgICAgICAgICAgIG5vdGlmaWNhdGlvbnM6IFtdLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IEdvb2dsZSB1c2VyIGNyZWF0ZWQ6XCIsIHVzZXIuZW1haWwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyB1c2VyIHdpdGggbGF0ZXN0IEdvb2dsZSBwaG90b1xuICAgICAgICAgICAgYXdhaXQgVXNlci5maW5kQnlJZEFuZFVwZGF0ZShleGlzdGluZ1VzZXIuX2lkLCB7XG4gICAgICAgICAgICAgIFwicHJvZmlsZS5hdmF0YXJcIjogdXNlci5pbWFnZSB8fCBleGlzdGluZ1VzZXIucHJvZmlsZS5hdmF0YXIsXG4gICAgICAgICAgICAgIHByb3ZpZGVyOiBcImdvb2dsZVwiLFxuICAgICAgICAgICAgICBnb29nbGVJZDogYWNjb3VudC5wcm92aWRlckFjY291bnRJZCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvb2dsZSB1c2VyIHVwZGF0ZWQ6XCIsIHVzZXIuZW1haWwpXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJHb29nbGUgc2lnbiBpbiBlcnJvcjpcIiwgZXJyb3IpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciwgYWNjb3VudCB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICAgIHRva2VuLnByb3ZpZGVyID0gYWNjb3VudD8ucHJvdmlkZXIgfHwgXCJjcmVkZW50aWFsc1wiXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uc3ViIVxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nXG4gICAgICAgIHNlc3Npb24udXNlci5wcm92aWRlciA9IHRva2VuLnByb3ZpZGVyIGFzIHN0cmluZ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvbG9naW5cIixcbiAgICBzaWduVXA6IFwiL3JlZ2lzdGVyXCIsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXG59XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucylcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJjb25uZWN0REIiLCJVc2VyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRPbmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsInJvbGUiLCJpbWFnZSIsInByb2ZpbGUiLCJhdmF0YXIiLCJwcm92aWRlciIsImVycm9yIiwiY29uc29sZSIsImNhbGxiYWNrcyIsInNpZ25JbiIsImFjY291bnQiLCJleGlzdGluZ1VzZXIiLCJjcmVhdGUiLCJiaW8iLCJnb29nbGVJZCIsInByb3ZpZGVyQWNjb3VudElkIiwiZW5yb2xsZWRDb3Vyc2VzIiwiY29tcGxldGVkQ291cnNlcyIsIm5vdGlmaWNhdGlvbnMiLCJsb2ciLCJmaW5kQnlJZEFuZFVwZGF0ZSIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInN1YiIsInBhZ2VzIiwic2lnblVwIiwic3RyYXRlZ3kiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI || \"mongodb://localhost:27017/eduverse\";\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable\");\n}\nlet cached = global.myMongoose;\nif (!cached) {\n    cached = global.myMongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectDB() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            return mongoose;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        throw e;\n    }\n    return cached.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStCO0FBRS9CLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVyxJQUFJO0FBRS9DLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFXQSxJQUFJQyxTQUFTQyxPQUFPQyxVQUFVO0FBRTlCLElBQUksQ0FBQ0YsUUFBUTtJQUNYQSxTQUFTQyxPQUFPQyxVQUFVLEdBQUc7UUFBRUMsTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDM0Q7QUFFTyxlQUFlQztJQUNwQixJQUFJTCxPQUFRRyxJQUFJLEVBQUU7UUFDaEIsT0FBT0gsT0FBUUcsSUFBSTtJQUNyQjtJQUVBLElBQUksQ0FBQ0gsT0FBUUksT0FBTyxFQUFFO1FBQ3BCLE1BQU1FLE9BQU87WUFDWEMsZ0JBQWdCO1FBQ2xCO1FBRUFQLE9BQVFJLE9BQU8sR0FBR1QsdURBQWdCLENBQUNDLGFBQWFVLE1BQU1HLElBQUksQ0FBQyxDQUFDZDtZQUMxRCxPQUFPQTtRQUNUO0lBQ0Y7SUFFQSxJQUFJO1FBQ0ZLLE9BQVFHLElBQUksR0FBRyxNQUFNSCxPQUFRSSxPQUFPO0lBQ3RDLEVBQUUsT0FBT00sR0FBRztRQUNWVixPQUFRSSxPQUFPLEdBQUc7UUFDbEIsTUFBTU07SUFDUjtJQUVBLE9BQU9WLE9BQVFHLElBQUk7QUFDckIiLCJzb3VyY2VzIjpbIkQ6XFxHSXRcXGVkdXZlcnNlXFxsaWJcXGRiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIlxuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIHx8IFwibW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9lZHV2ZXJzZVwiXG5cbmlmICghTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGRlZmluZSB0aGUgTU9OR09EQl9VUkkgZW52aXJvbm1lbnQgdmFyaWFibGVcIilcbn1cblxuaW50ZXJmYWNlIEdsb2JhbE1vbmdvb3NlIHtcbiAgY29ubjogdHlwZW9mIG1vbmdvb3NlIHwgbnVsbFxuICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsXG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIG15TW9uZ29vc2U6IEdsb2JhbE1vbmdvb3NlIHwgdW5kZWZpbmVkXG59XG5cbmxldCBjYWNoZWQgPSBnbG9iYWwubXlNb25nb29zZVxuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubXlNb25nb29zZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKSB7XG4gIGlmIChjYWNoZWQhLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkIS5jb25uXG4gIH1cblxuICBpZiAoIWNhY2hlZCEucHJvbWlzZSkge1xuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgfVxuXG4gICAgY2FjaGVkIS5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2UpID0+IHtcbiAgICAgIHJldHVybiBtb25nb29zZVxuICAgIH0pXG4gIH1cblxuICB0cnkge1xuICAgIGNhY2hlZCEuY29ubiA9IGF3YWl0IGNhY2hlZCEucHJvbWlzZVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkIS5wcm9taXNlID0gbnVsbFxuICAgIHRocm93IGVcbiAgfVxuXG4gIHJldHVybiBjYWNoZWQhLmNvbm5cbn1cbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwibXlNb25nb29zZSIsImNvbm4iLCJwcm9taXNlIiwiY29ubmVjdERCIiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./models/user.ts":
/*!************************!*\
  !*** ./models/user.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   User: () => (/* binding */ User)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst userSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: true,\n        trim: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        required: function() {\n            return this.provider === \"credentials\";\n        },\n        minlength: 6\n    },\n    role: {\n        type: String,\n        enum: [\n            \"student\",\n            \"admin\"\n        ],\n        default: \"student\"\n    },\n    provider: {\n        type: String,\n        enum: [\n            \"credentials\",\n            \"google\"\n        ],\n        default: \"credentials\"\n    },\n    googleId: {\n        type: String,\n        sparse: true\n    },\n    enrolledCourses: [\n        {\n            type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n            ref: \"Course\"\n        }\n    ],\n    completedCourses: [\n        {\n            type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n            ref: \"Course\"\n        }\n    ],\n    notifications: [\n        {\n            title: String,\n            body: String,\n            read: {\n                type: Boolean,\n                default: false\n            },\n            createdAt: {\n                type: Date,\n                default: Date.now\n            }\n        }\n    ],\n    profile: {\n        avatar: {\n            type: String,\n            default: \"/placeholder-avatar.png\"\n        },\n        bio: String,\n        website: String,\n        social: {\n            twitter: String,\n            linkedin: String,\n            github: String\n        }\n    }\n}, {\n    timestamps: true\n});\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", userSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvdXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0I7QUFFL0IsTUFBTUMsYUFBYSxJQUFJRCx3REFBZSxDQUNwQztJQUNFRyxNQUFNO1FBQ0pDLE1BQU1DO1FBQ05DLFVBQVU7UUFDVkMsTUFBTTtJQUNSO0lBQ0FDLE9BQU87UUFDTEosTUFBTUM7UUFDTkMsVUFBVTtRQUNWRyxRQUFRO1FBQ1JDLFdBQVc7UUFDWEgsTUFBTTtJQUNSO0lBQ0FJLFVBQVU7UUFDUlAsTUFBTUM7UUFDTkMsVUFBVTtZQUNSLE9BQU8sSUFBSSxDQUFDTSxRQUFRLEtBQUs7UUFDM0I7UUFDQUMsV0FBVztJQUNiO0lBQ0FDLE1BQU07UUFDSlYsTUFBTUM7UUFDTlUsTUFBTTtZQUFDO1lBQVc7U0FBUTtRQUMxQkMsU0FBUztJQUNYO0lBQ0FKLFVBQVU7UUFDUlIsTUFBTUM7UUFDTlUsTUFBTTtZQUFDO1lBQWU7U0FBUztRQUMvQkMsU0FBUztJQUNYO0lBQ0FDLFVBQVU7UUFDUmIsTUFBTUM7UUFDTmEsUUFBUTtJQUNWO0lBQ0FDLGlCQUFpQjtRQUNmO1lBQ0VmLE1BQU1KLHdEQUFlLENBQUNvQixLQUFLLENBQUNDLFFBQVE7WUFDcENDLEtBQUs7UUFDUDtLQUNEO0lBQ0RDLGtCQUFrQjtRQUNoQjtZQUNFbkIsTUFBTUosd0RBQWUsQ0FBQ29CLEtBQUssQ0FBQ0MsUUFBUTtZQUNwQ0MsS0FBSztRQUNQO0tBQ0Q7SUFDREUsZUFBZTtRQUNiO1lBQ0VDLE9BQU9wQjtZQUNQcUIsTUFBTXJCO1lBQ05zQixNQUFNO2dCQUNKdkIsTUFBTXdCO2dCQUNOWixTQUFTO1lBQ1g7WUFDQWEsV0FBVztnQkFDVHpCLE1BQU0wQjtnQkFDTmQsU0FBU2MsS0FBS0MsR0FBRztZQUNuQjtRQUNGO0tBQ0Q7SUFDREMsU0FBUztRQUNQQyxRQUFRO1lBQ043QixNQUFNQztZQUNOVyxTQUFTO1FBQ1g7UUFDQWtCLEtBQUs3QjtRQUNMOEIsU0FBUzlCO1FBQ1QrQixRQUFRO1lBQ05DLFNBQVNoQztZQUNUaUMsVUFBVWpDO1lBQ1ZrQyxRQUFRbEM7UUFDVjtJQUNGO0FBQ0YsR0FDQTtJQUNFbUMsWUFBWTtBQUNkO0FBR0ssTUFBTUMsT0FBT3pDLHdEQUFlLENBQUN5QyxJQUFJLElBQUl6QyxxREFBYyxDQUFDLFFBQVFDLFlBQVciLCJzb3VyY2VzIjpbIkQ6XFxHSXRcXGVkdXZlcnNlXFxtb2RlbHNcXHVzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiXG5cbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxuICB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0cmltOiB0cnVlLFxuICAgIH0sXG4gICAgZW1haWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdW5pcXVlOiB0cnVlLFxuICAgICAgbG93ZXJjYXNlOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIHBhc3N3b3JkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm92aWRlciA9PT0gXCJjcmVkZW50aWFsc1wiXG4gICAgICB9LFxuICAgICAgbWlubGVuZ3RoOiA2LFxuICAgIH0sXG4gICAgcm9sZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZW51bTogW1wic3R1ZGVudFwiLCBcImFkbWluXCJdLFxuICAgICAgZGVmYXVsdDogXCJzdHVkZW50XCIsXG4gICAgfSxcbiAgICBwcm92aWRlcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZW51bTogW1wiY3JlZGVudGlhbHNcIiwgXCJnb29nbGVcIl0sXG4gICAgICBkZWZhdWx0OiBcImNyZWRlbnRpYWxzXCIsXG4gICAgfSxcbiAgICBnb29nbGVJZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgc3BhcnNlOiB0cnVlLFxuICAgIH0sXG4gICAgZW5yb2xsZWRDb3Vyc2VzOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICAgICAgcmVmOiBcIkNvdXJzZVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvbXBsZXRlZENvdXJzZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgICAgICByZWY6IFwiQ291cnNlXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgbm90aWZpY2F0aW9uczogW1xuICAgICAge1xuICAgICAgICB0aXRsZTogU3RyaW5nLFxuICAgICAgICBib2R5OiBTdHJpbmcsXG4gICAgICAgIHJlYWQ6IHtcbiAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVkQXQ6IHtcbiAgICAgICAgICB0eXBlOiBEYXRlLFxuICAgICAgICAgIGRlZmF1bHQ6IERhdGUubm93LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICAgIHByb2ZpbGU6IHtcbiAgICAgIGF2YXRhcjoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6IFwiL3BsYWNlaG9sZGVyLWF2YXRhci5wbmdcIixcbiAgICAgIH0sXG4gICAgICBiaW86IFN0cmluZyxcbiAgICAgIHdlYnNpdGU6IFN0cmluZyxcbiAgICAgIHNvY2lhbDoge1xuICAgICAgICB0d2l0dGVyOiBTdHJpbmcsXG4gICAgICAgIGxpbmtlZGluOiBTdHJpbmcsXG4gICAgICAgIGdpdGh1YjogU3RyaW5nLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgdGltZXN0YW1wczogdHJ1ZSxcbiAgfSxcbilcblxuZXhwb3J0IGNvbnN0IFVzZXIgPSBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbChcIlVzZXJcIiwgdXNlclNjaGVtYSlcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsInVzZXJTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsImVtYWlsIiwidW5pcXVlIiwibG93ZXJjYXNlIiwicGFzc3dvcmQiLCJwcm92aWRlciIsIm1pbmxlbmd0aCIsInJvbGUiLCJlbnVtIiwiZGVmYXVsdCIsImdvb2dsZUlkIiwic3BhcnNlIiwiZW5yb2xsZWRDb3Vyc2VzIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsImNvbXBsZXRlZENvdXJzZXMiLCJub3RpZmljYXRpb25zIiwidGl0bGUiLCJib2R5IiwicmVhZCIsIkJvb2xlYW4iLCJjcmVhdGVkQXQiLCJEYXRlIiwibm93IiwicHJvZmlsZSIsImF2YXRhciIsImJpbyIsIndlYnNpdGUiLCJzb2NpYWwiLCJ0d2l0dGVyIiwibGlua2VkaW4iLCJnaXRodWIiLCJ0aW1lc3RhbXBzIiwiVXNlciIsIm1vZGVscyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/user.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CGIt%5Ceduverse%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CGIt%5Ceduverse&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CGIt%5Ceduverse%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CGIt%5Ceduverse&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_GIt_eduverse_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\GIt\\\\eduverse\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_GIt_eduverse_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDR0l0JTVDZWR1dmVyc2UlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNHSXQlNUNlZHV2ZXJzZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDVTtBQUN2RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcR0l0XFxcXGVkdXZlcnNlXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkQ6XFxcXEdJdFxcXFxlZHV2ZXJzZVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CGIt%5Ceduverse%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CGIt%5Ceduverse&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/bcryptjs","vendor-chunks/preact","vendor-chunks/object-hash","vendor-chunks/lru-cache"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CGIt%5Ceduverse%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CGIt%5Ceduverse&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();