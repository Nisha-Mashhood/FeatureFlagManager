import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";

import { me } from "../services/auth.service";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({
    children,
}: Props) => {
    const [loading, setLoading] =
        useState(true);

    const [authenticated, setAuthenticated] =
        useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await me();
                setAuthenticated(true);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    setAuthenticated(false);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <Spin fullscreen />;
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;