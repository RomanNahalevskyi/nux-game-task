<template>
    <div class="user-information">
        <MainContainer>
            <div class="information">
                <UserInfoLabel label="Address" :value="userData.address.city" />
                <UserInfoLabel label="Email" :value="userData.email" />
                <UserInfoLabel label="Name" :value="userData.name" />
                <UserInfoLabel label="UserName" :value="userData.username" />
                <UserInfoLabel label="Website" :value="userData.website" />
                <UserInfoLabel label="Phone" :value="userData.phone" />
            </div>
        </MainContainer>
    </div>
</template>

<script>
import MainContainer from '@/components/MainContainer.vue';
import UserInfoLabel from '@/components/UserInfoLabel.vue';

export default {
    name: 'UserInformation',
    components: { UserInfoLabel, MainContainer },
    props: {
        userData: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style scoped>
.user-information {
    width: 100%;
    background-color: var(--main-green-color);
}

.information {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr auto;
    gap: 10px;
}
</style>
